import { LightningElement, track,api } from 'lwc';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalSchedJsV5';

import CustomCalCss from '@salesforce/resourceUrl/CustomCalCss';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { NavigationMixin } from "lightning/navigation";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import LightningConfirm from 'lightning/confirm';
import { deleteRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import returnPurposesAccordingToWorkType from '@salesforce/apex/CustomCalendarController.returnPurposesAccordingToWorkType';
import returnWorkTypesAccordingToLocation from '@salesforce/apex/CustomCalendarController.returnWorkTypesAccordingToLocation';
import getMeetingsDataByFilters from '@salesforce/apex/CustomCalendarController.getMeetingsDataByFilters';
import getAllMeetingsData from '@salesforce/apex/CustomCalendarController.getAllMeetingsData';
import getWorkTypeNames from '@salesforce/apex/CustomCalendarController.ReturnAllWorkTypeNames';
import getMeetingsDataByWorkType from '@salesforce/apex/AppointmentCalendar2controller.getMeetingsDataByWorkType';
import getPurposeNames from '@salesforce/apex/CustomCalendarController.ReturnAllPurposeNames';
import getLocationNames from '@salesforce/apex/CustomCalendarController.ReturnAllLocationNames';
import updateMeetingDates from '@salesforce/apex/CustomCalendarController.updateMeetingDates';
export default class CustomCalendar extends NavigationMixin(LightningElement) {
 @api recordId;
calendar;
calendarTitle;
objectApiName = 'ServiceAppointment';
objectLabel = '';
eventsList = [];
isCalendarInitialized = false;
    @track date = new Date();
@track selectedDate ;  // Track the selected date
@track weeks = [];
@track currentView = 'dayGridMonth';
@track selecetedDateUTC ;
 
 @track resources = [
        { id: 'Icon Room', title: 'Icon Room' },
        { id: 'Injectables 1 Room', title: 'Injectables 1 Room' },
        { id: 'Laser Hair Removal Room', title: 'Laser Hair Removal Room' },
        {id: 'Injectables 2 Room', title: 'Injectables 2 Room'},
        {id: 'Injectables 3 Room', title: 'Injectables 3 Room'},
        {id: 'Injectables 4 Room', title: 'Injectables 4 Room'},
        {id: 'Vanquish 1 Room', title: 'Vanquish 1 Room'},
        {id: 'Vanquish 2 Room', title: 'Vanquish 2 Room'},
        {id: 'Tattoo Removal', title: 'Tattoo Removal'},
        {id: 'Esthetician Room', title: 'Esthetician Room'},
        {id: 'Esthetician 1 Room', title: 'Esthetician 1 Room'},
        {id: 'Esthetician 2 Room', title: 'Esthetician 2 Room'},
        {id: 'Emsculpt', title: 'Emsculpt'},
        {id: 'Emsculpt 1 Room', title: 'Emsculpt 1 Room'},
        {id: 'Emsculpt 2 Room', title: 'Emsculpt 2 Room'},
        {id: 'Consultation', title: 'Consultation'},
       
    ];
viewOptions = [
    {
        label: 'Day',
        viewName: 'timeGridDay',
        checked: false
    },
    {
        label: 'Week',
        viewName: 'timeGridWeek',
        checked: false
    },
    {
        label: 'Month',
        viewName: 'dayGridMonth',
        checked: true
    },
    {
        label: 'Table',
        viewName: 'listView',
        checked: false
    },
    {
        label: 'Rooms',
        viewName: 'resourceTimeGridDay',
        checked: false
    }
    
];

get buttonLabel() {
    return 'New ' + this.objectLabel;
}
@track WorkTypeValue = '';
@track WorkTypeValues = [];
@track MakeWorkTypeVisible = false;

@track PurposeValue = '';
@track MakePurposeVisible = false;
@track PurposeValues = []; // Replace with actual values

@track LocationValue = '';
@track MakeLocationVisible = false;
@track LocationValues = [];

    @track showFlowComponent = false;
    @track flowApiName = 'Client_Appointment';
    @track flowInputVariables = [];

connectedCallback() {
    console.log('recordIDClient: '+ this.recordId);
    this.generateCalendar();
    Promise.all([
        loadStyle(this, FullCalendarJS + '/lib/main.css'),
        loadScript(this, FullCalendarJS + '/lib/main.js'),
       // loadStyle(this, CustomCalCss)
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
                        resourceId: meeting.Room_Name__c
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




initializeCalendar(view = this.currentView, resources = []) {
    const calendarEl = this.template.querySelector('div.fullcalendar');
    const copyOfOuterThis = this;

    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'event-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.background = '#FFD052';
    tooltip.style.border = '1px solid #ccc';
    tooltip.style.padding = '10px';
    tooltip.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    tooltip.style.zIndex = '1000';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: view,
        initialDate: this.selectedDate,
        headerToolbar: false,
        timeZone: 'America/New_York',
        showNonCurrentDates: false,
        fixedWeekCount: false,
        allDaySlot: false,
        navLinks: false,
        events: copyOfOuterThis.eventsList,
        eventDisplay: 'block',
        editable: true, // Makes the events draggable
        eventDrop: function (info) {
                // Handle the drop event
                copyOfOuterThis.handleEventDrop(info.event);
            },
        businessHours: [
            {
                daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
                startTime: '10:00',
                endTime: '17:00'
            },
            {
                daysOfWeek: [6], // Saturday
                startTime: '09:00',
                endTime: '17:00'
            },
            {
                daysOfWeek: [0], // Sunday
                startTime: '00:00',
                endTime: '00:00'
            }
        ],
        eventTimeFormat: {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: true,
            meridiem: 'short'
        },
        dayMaxEventRows: true,
        eventTextColor: 'rgb(3, 45, 96)',

        eventMouseEnter: function(info) {
            tooltip.style.display = 'block';
            tooltip.innerHTML = `
                <strong>Title:</strong> ${info.event.title}<br>
                <strong>Start:</strong> ${info.event.start.toLocaleString()}<br>
                <strong>End:</strong> ${info.event.end ? info.event.end.toLocaleString() : 'N/A'}<br>
            `;
            tooltip.style.top = `${info.jsEvent.pageY + 10}px`;
            tooltip.style.left = `${info.jsEvent.pageX + 10}px`;
        },
        eventMouseLeave: function(info) {
            tooltip.style.display = 'none';
        },

        dateClick: function (info) {
            console.log('Date clicked:', info.dateStr);
            console.log('Date Only clicked:', info.date);
            const defaultValues = encodeDefaultFieldValues({
                SchedStartTime: info.dateStr
            });

            console.log('defaultValues:', defaultValues);

            if (copyOfOuterThis.isWithinBusinessHours(new Date(info.date)) ) {
                console.log('date click if running');
                copyOfOuterThis.navigateToNewRecordPage2(copyOfOuterThis.objectApiName, defaultValues);
            } else if (!info.dateStr.includes('T') && !copyOfOuterThis.isWithinBusinessHours(new Date(info.date))) {
                console.log('date click else running');
                copyOfOuterThis.navigateToNewRecordPage2(copyOfOuterThis.objectApiName, defaultValues);
            }
            else if (!copyOfOuterThis.isWithinBusinessHours(new Date(info.date))) {
                console.log('date click else running');
                copyOfOuterThis.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Cannot book Appointments outside business hours',
                        variant: 'error'
                    })
                );
            }
            
        },
        
        eventClick: function (info) {
            console.log('Event clicked:', info.event);
            copyOfOuterThis.showConfirmWindow(info.event);
        },
        resources: resources,
        eventDidMount: function(info) {
            const event = info.event;
            const subject = event.title.toLowerCase();

            let bgColor = '#FA7070'; 
            const roomColors = {
                'icon room': '#808000',
                'injectables 1 room': '#FF4500',
                'laser hair removal room': '#FFD700',
                'injectables 2 room': '#008080',
                'injectables 3 room': '#800080',
                'injectables 4 room': '#FF6347',
                'vanquish 1 room': '#7B68EE',
                'vanquish 2 room': '#32CD32',
                'tattoo removal': '#00CED1',
                'esthetician room': '#20B2AA',
                'esthetician 1 room': '#FF1493',
                'esthetician 2 room': '#8A2BE2',
                'emsculpt': '#8B0000',
                'emsculpt 1 room': '#BA55D3',
                'emsculpt 2 room': '#DAA520',
                'consultation': '#FF69B4',
                'injectable 2 room': '#00FF00',
                'injectable 3 room': '#FF4500',
                'injectable 4 room': '#4682B4',
                'injectable 1 room': '#808080',
                'undefined': '#F5C370'
            };
            bgColor = roomColors[subject] || bgColor;

            // Set the background color of the event element
            info.el.style.backgroundColor = bgColor;
            info.el.style.color = '#FFFFFF'; // Set text color to white for better readability
        },
        viewDidMount: function() {
            // Change the color of non-business hours
            const nonBusinessHours = calendarEl.querySelectorAll('.fc-non-business');
            nonBusinessHours.forEach(el => {
                el.style.backgroundColor = '#FF0000'; // Change to your desired color
            });
        }
    });

    calendar.render();
    calendar.setOption('contentHeight', 850);
    this.calendarTitle = calendar.view.title;
    this.calendar = calendar;
    this.isCalendarInitialized = true;
}

isWithinBusinessHours(date) {
    console.log('runing is within business houers');
    console.log('date inside business: ' +date);
    const businessHours = [
        { daysOfWeek: [1, 2, 3, 4, 5], startTime: '10:00', endTime: '17:00' },
        { daysOfWeek: [6], startTime: '09:00', endTime: '17:00' },
        { daysOfWeek: [0], startTime: '00:00', endTime: '00:00' }
    ];

    const day = date.getUTCDay();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    for (const period of businessHours) {
        if (period.daysOfWeek.includes(day)) {
            const [startHour, startMinute] = period.startTime.split(':').map(Number);
            const [endHour, endMinute] = period.endTime.split(':').map(Number);

            const start = startHour * 60 + startMinute;
            const end = endHour * 60 + endMinute;
            const time = hours * 60 + minutes;

            if (start <= time && time < end) {
                return true;
            }
        }
    }
    return false;
}


handleEventDrop(event) {
        const eventId = event.id;
        const newStartTime = event.start;
        const newEndTime = event.end;

        updateMeetingDates({ eventId, newStartTime, newEndTime })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Event updated successfully',
                        variant: 'success',
                    })
                );
            })
            .catch(error => {
                console.error('Error updating event dates:', error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Failed to update event',
                        variant: 'error',
                    })
                );
            });
    }

changeViewHandler(event) {
    const viewName = event.detail.value;
    if (viewName !== 'listView' && viewName !== 'resourceTimeGridDay') {
        this.currentView = viewName;
       this.calendar.changeView(viewName);
        const viewOptions = [...this.viewOptions];
        for (let viewOption of viewOptions) {
            viewOption.checked = false;
            if (viewOption.viewName === viewName) {
                viewOption.checked = true;
            }
        }
        this.viewOptions = viewOptions;
        this.calendarTitle = this.calendar.view.title;
        

    }
    else if(viewName == 'resourceTimeGridDay'){
        console.log('runing@@@@323211');
        this.currentView = viewName;
       
        const viewOptions = [...this.viewOptions];
        for (let viewOption of viewOptions) {
            viewOption.checked = false;
            if (viewOption.viewName === viewName) {
                viewOption.checked = true;
            }
        }
        this.viewOptions = viewOptions;
       
        
     this.ChangeViewToRoomView ();
     
    }
    
      else {
        this.handleListViewNavigation(this.objectApiName);
    }
}

ChangeViewToRoomView (){

    console.log('runingChabgeView@@');

    this.initializeCalendar('resourceTimeGridDay', this.resources);
    this.calendarTitle = this.calendar.view.title;
    
}

selectDate(event) {
    const dateString = event.target.dataset.datestring;
    const dateParts = dateString.split('-').map(part => parseInt(part, 10));
    const selectedDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2], 12, 0, 0));
    this.selecetedDateUTC = selectedDate;
    this.selectedDate = selectedDate.toISOString().slice(0, 10);
    this.generateCalendar();

      console.log(this.currentView);
   // if (this.currentView !== 'resourceTimeGridDay') {
          console.log('leftRUUN@@');
         this.calendar.gotoDate(selectedDate);
       this.calendarTitle = this.calendar.view.title;
   // }
    /*else if(this.currentView == 'resourceTimeGridDay'){
        console.log('runingCurren@@');
         this.calendar.gotoDate(selectedDate);
        this.calendarTitle = this.calendar.view.title;
       
        console.log('this.calendar.view.title:', this.calendar.view.title);
    }*/

    

    const viewOptions = [...this.viewOptions];
    for (let viewOption of viewOptions) {
        viewOption.checked = false;
        if (viewOption.viewName === this.currentView) {
            viewOption.checked = true;
        }
    }
    this.viewOptions = viewOptions;
}


handleInputClick(event) {
    if(this.WorkTypeValue === ''){
        getWorkTypeNames()
        .then(result => {
            if (result) {
                this.WorkTypeValues = result;
                    console.log('result2: ' + JSON.stringify(result));
            }

        })
        .catch(error => {
            console.log('Error fetching Work Types:', error);
        });
    }
                this.MakeLocationVisible = false;
                this.MakePurposeVisible = false;
                this.MakeWorkTypeVisible = !this.MakeWorkTypeVisible;

}
handlePurposeInputClick(event) {
        if (this.WorkTypeValue === ''){
            getPurposeNames()
        .then(result => {
            if (result) { 
                    this.PurposeValues = result;
                console.log('result2: ' + JSON.stringify(result));
                }

        })
        .catch(error => {
            console.log('Error fetching Purposes :', error);

        });
        }
                this.MakeLocationVisible = false;
                this.MakeWorkTypeVisible = false;
                this.MakePurposeVisible = !this.MakePurposeVisible;
}
handleLocationInputClick(event) {
    getLocationNames()
        .then(result => {
            if (result) {
                this.MakePurposeVisible = false;
                this.MakeWorkTypeVisible = false;
                this.LocationValues = result;
                this.MakeLocationVisible = !this.MakeLocationVisible;
                console.log('result2: ' + JSON.stringify(result));
            }

        })
        .catch(error => {
            console.log('Error fetching Locations :', error);
        });
}



handlePicklistSelect(event) {
    const selectedValue = event.target.getAttribute('value');
    console.log('Selected WorkType Value:', selectedValue);
    if (selectedValue === this.WorkTypeValue) {
        this.WorkTypeValue = '';
        this.MakeWorkTypeVisible = false;
    } else {
        this.WorkTypeValue = selectedValue;
        this.MakeWorkTypeVisible = false;
        returnPurposesAccordingToWorkType({WorkType: this.WorkTypeValue})
                .then(result =>{
    this.PurposeValues = result;
    console.log('Location Values List: '+ this.LocationValues);
    // this.isDisabledPurpose = false;

                })
                .catch(error=>{
        console.log('Error while fetching returnWorkTypesAccordingToLocation :' + error.message );
                })
    }
    console.log('Final WorkType Value:', this.WorkTypeValue);
    this.getMeetingsDataByFiltersFunc(this.WorkTypeValue, this.PurposeValue, this.LocationValue);
}

handlePurposePicklistSelect(event) {
    const selectedValue = event.target.getAttribute('value');
    console.log('Selected Purpose Value:', selectedValue);
    if (selectedValue === this.PurposeValue) {
        this.PurposeValue = '';
        this.MakePurposeVisible = false;
    } else {
        this.PurposeValue = selectedValue;
        this.MakePurposeVisible = false;
    }
    console.log('Final Purpose Value:', this.PurposeValue);
    this.getMeetingsDataByFiltersFunc(this.WorkTypeValue, this.PurposeValue, this.LocationValue);
}

handleLocationPicklistSelect(event) {
    const selectedValue = event.target.getAttribute('value');
    console.log('Selected Location Value:', selectedValue);
    if (selectedValue === this.LocationValue) {
        this.LocationValue = '';
        this.MakeLocationVisible = false;
    } else {
        this.LocationValue = selectedValue;
        this.MakeLocationVisible = false;
                returnWorkTypesAccordingToLocation({location: this.LocationValue})
                .then(result =>{
    this.WorkTypeValues = result;
    console.log('Location Values List: '+ this.LocationValues);
    // this.isDisabledWorkType = false;

                })
                .catch(error=>{
        console.log('Error while fetching returnWorkTypesAccordingToLocation :' + error.message );
                })
    }
    console.log('Final Location Value:', this.LocationValue);
    this.getMeetingsDataByFiltersFunc(this.WorkTypeValue, this.PurposeValue, this.LocationValue);
}

handleClearClick(event) {
    this.WorkTypeValue = '';
    this.MakeWorkTypeVisible = false;
    this.getMeetingsDataByFiltersFunc(this.WorkTypeValue, this.PurposeValue, this.LocationValue);
}
handleLocationClearClick(event) {
    this.LocationValue = '';
    this.MakeLocationVisible = false;
    this.getMeetingsDataByFiltersFunc(this.WorkTypeValue, this.PurposeValue, this.LocationValue);
}
handlePurposeClearClick(event) {
    this.PurposeValue = '';
    this.MakePurposeVisible = false;
    this.getMeetingsDataByFiltersFunc(this.WorkTypeValue, this.PurposeValue, this.LocationValue);
}

getMeetingsDataByFiltersFunc(workTypeName, PurposeName, LocationName) {
    console.log('PurposeName33: ' + PurposeName);
    console.log('LocatuonName: ' + LocationName);
    console.log('workTypeName: ' + workTypeName);
    getMeetingsDataByFilters({ workTypeName, purpose: PurposeName, location: LocationName })

        .then(result => {
            if (result) {
                this.eventsList = result.map(meeting => ({
                    id: meeting.Id,
                    editable: true,
                    allDay: false,
                    start: meeting.SchedStartTime,
                    end: meeting.SchedEndTime,
                    title: meeting.Room_Name__c,
                    resourceId: meeting.Room_Name__c
                }));
                this.initializeCalendar();
            }
        })
        .catch(error => {
            console.error('Error fetching filtered events:', error);
        });
}










handleListViewNavigation(objectName) {
    this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes: {
            objectApiName: objectName,
            actionName: 'list'
        },
        state: {
            filterName: 'Recent'
        }
    });
}

calendarActionsHandler(event) {
    const actionName = event.target.value;
    if (actionName === 'previous') {
        this.calendar.prev();
    } else if (actionName === 'next') {
        this.calendar.next();
    } else if (actionName === 'today') {
        console.log('today runing action');
        this.calendar.today();
    } else if (actionName === 'new') {
            this.showFlowComponent = true;
            this.flowInputVariables = [
                {
                    name: "recordId",
                    type: "String",
                    value: "003Dh00001VvGINIA3", // Replace with dynamic value if needed
                },
            ];
        } else if (actionName === 'refresh') {
        this.refreshHandler();
    }
    this.calendarTitle = this.calendar.view.title;
}
handleFlowStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Flow Finished Successfully',
                    variant: 'success',
                })
            );
            this.showFlowComponent = false; // Hide the flow component after finishing
        }
    }

navigateToNewRecordPage(objectName, defaultValues = {}) {
    // Ensure defaultValues is an object
    if (typeof defaultValues !== 'object') {
        defaultValues = {};
        console.log('runing@###' + JSON.stringify(defaultValues));
    }


    // Encode default values
    const encodedDefaultValues = encodeDefaultFieldValues(defaultValues);

    // Log for debugging
    console.log('navigateToNewRecordPage called with:', objectName, encodedDefaultValues);

    // Perform the navigation
    this[NavigationMixin.Navigate]({
        type: "standard__objectPage",
        attributes: {
            objectApiName: objectName,
            actionName: "new",
        },
        state: {
            defaultFieldValues: encodedDefaultValues
        }
    }).then(() => {
        console.log('Navigation successful');
    }).catch((error) => {
        console.error('Navigation error:', error);
    });
}
navigateToNewRecordPage2(objectName, defaultValues) {
    if (!defaultValues) {
        defaultValues = {};
    }
    console.log('Default values inside rp2: '+defaultValues);
    this[NavigationMixin.Navigate]({
        type: "standard__objectPage",
        attributes: {
            objectApiName: objectName,
            actionName: "new",
        },
        state: {
            defaultFieldValues: defaultValues
        }
    });
}




/*  convertToLocalTime(dateTimeStr) {
        const dateTime = new Date(dateTimeStr);
        const userOffset = dateTime.getTimezoneOffset() * 60000; // offset in milliseconds
        const localTime = new Date(dateTime.getTime() - userOffset);
        return localTime.toISOString().slice(0, 19); // returns in 'YYYY-MM-DDTHH:mm:ss' format
    }*/

refreshHandler() {
    this.fetchEventsData();
}




async showConfirmWindow(event) {

    // Use NavigationMixin to navigate to the edit page
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: event.id,
            actionName: 'edit',
        }
    });

}

handleKeydown(event) {
    const invalidKeyCodes = [
        ...Array(26).fill(65).map((code, idx) => code + idx), // A-Z
        ...Array(26).fill(97).map((code, idx) => code + idx), // a-z
        ...Array(10).fill(48).map((code, idx) => code + idx), // 0-9
        ...Array(10).fill(96).map((code, idx) => code + idx), // Numpad 0-9
        32, // Space
        189, // Dash
        187, // Equals
        188, // Comma
        190, // Period
        191, // Slash
        192, // Backtick
        219, // Open bracket
        220, // Backslash
        221, // Close bracket
        222,  // Single quote
        186, // Semicolon and colon (;:)
        46,//delete
        8 //backspace
    ];

    if (invalidKeyCodes.includes(event.keyCode)) {
        event.preventDefault();
    }
}
///////////////////custom date picker js
    get monthYearDisplay() {
    return this.date.toLocaleDateString('default', { month: 'long', year: 'numeric' });
}

generateCalendar() {
console.log('Generating calendar for selected date:', this.selectedDate);
const startDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
const endDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

const startDate = startDay.getDate() - startDay.getDay(); // Adjust to start on Sunday
const endDate = endDay.getDate() + (6 - endDay.getDay()); // Adjust to end on Saturday

let days = [];
for (let day = startDate; day <= endDate; day++) {
    const currentDay = new Date(this.date.getFullYear(), this.date.getMonth(), day, 12, 0, 0); // Set noon to avoid DST issues
    let classes = "day" + (currentDay.getMonth() === this.date.getMonth() ? "" : " other-month");
    if (this.selectedDate && currentDay.toISOString().slice(0, 10) === this.selectedDate) {
        classes += " selected"; // Highlight selected date
    }
    days.push({
        day: currentDay.getDate(),
        dateString: currentDay.toISOString().slice(0, 10),
        classes: classes
    });
}

this.weeks = [];
while (days.length) {
    this.weeks.push({ id: days[0].dateString, days: days.splice(0, 7) });
}
}

goToPreviousMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.generateCalendar();
    
}

goToNextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.generateCalendar();
    
    
}

 handleCloseModal() {
        this.showFlowComponent = false;
    }

}