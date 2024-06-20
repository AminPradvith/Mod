import { LightningElement } from 'lwc';
import FullCalSchedJsV5 from '@salesforce/resourceUrl/FullCalSchedJsV5';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import getAllMeetingsData from '@salesforce/apex/AppointmentCalendar2controller.getAllMeetingsData';

export default class CalRoomView extends LightningElement {
    calendar;
    calendarTitle;
    objectApiName = 'ServiceAppointment';
    objectLabel = '';
    eventsList = [];
    isCalendarInitialized = false;

    connectedCallback() {
        Promise.all([
            loadStyle(this, FullCalSchedJsV5 + '/lib/main.css'),
            loadScript(this, FullCalSchedJsV5 + '/lib/main.js')
        ])
            .then(() => {
                this.fetchEventsData();
                console.log('connectedCallback: resources loaded');
            })
            .catch(error => console.log('Error loading resources:', error));
    }

    fetchEventsData() {
        getAllMeetingsData()
            .then(result => {
                if (result) {
                    const eventList = [];
                    for (let meeting of result) {
                        const event = {
                            id: meeting.Id,
                            editable: true,
                            allDay: false,
                            start: meeting.SchedStartTime,
                            end: meeting.SchedEndTime,
                            title: meeting.Room_Name__c,
                            resourceId: meeting.Room_Name__c // Assuming Room_Name__c matches the resource ID
                        };
                        eventList.push(event);
                    }
                    this.eventsList = eventList;
                    console.log('eventList' + JSON.stringify(this.eventsList));
                    this.initializeCalendar();
                }
            })
            .catch(error => {
                console.log('Error fetching events data:', error);
            });
    }

    initializeCalendar() {
        const calendarEl = this.template.querySelector('div.fullcalendar');
        const copyOfOuterThis = this;
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'resourceTimeGridDay', // Set the initial view to resourceTimeline
            initialDate: new Date(),
            timeZone: 'UTC',
            showNonCurrentDates: false,
            fixedWeekCount: false,
            allDaySlot: false,
            navLinks: false,
            events: copyOfOuterThis.eventsList,
            eventDisplay: 'block',
            eventColor: '#f36e83',
            eventTimeFormat: {
                hour: 'numeric',
                minute: '2-digit',
                omitZeroMinute: true,
                meridiem: 'short'
            },
            dayMaxEventRows: true,
            eventTextColor: 'rgb(3, 45, 96)',
            dateClick: function (info) {
                console.log('Date clicked:', info.dateStr);
                const defaultValues = encodeDefaultFieldValues({
                    SchedStartTime: info.dateStr
                });
                copyOfOuterThis.navigateToNewRecordPage2(copyOfOuterThis.objectApiName, defaultValues);
            },
            eventClick: function (info) {
                console.log('Event clicked:', info.event);
                copyOfOuterThis.showConfirmWindow(info.event);
            },
            resources: [
                { id: 'Icon Room', title: 'Icon Room' },
                { id: 'Injectables 1 Room', title: 'Injectables 1 Room' },
                { id: 'Laser Hair Removal Room', title: 'Laser Hair Removal Room' }
            ]
        });
        calendar.render();
        calendar.setOption('contentHeight', 850);
        this.calendarTitle = calendar.view.title;
        this.calendar = calendar;
        this.isCalendarInitialized = true; // Set the flag to true once calendar is initialized
    }
}