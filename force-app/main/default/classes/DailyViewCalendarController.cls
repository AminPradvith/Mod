// DailyViewCalendarController.cls
public with sharing class DailyViewCalendarController {
    // Method to fetch appointment data for the selected day
    @AuraEnabled(cacheable=true)
    public static List<AppointmentWrapper> getAppointments(Date selectedDate) {
        List<AppointmentWrapper> appointments = new List<AppointmentWrapper>();

        // Query to fetch appointment data for the selected day
        List<ServiceAppointment> serviceAppointments = [SELECT Id, SchedStartTime, SchedEndTime, AppointmentNumber, Room__r.Name FROM ServiceAppointment ];

        // Convert queried records into wrapper objects
        for (ServiceAppointment sa : serviceAppointments) {
            appointments.add(new AppointmentWrapper(sa.Id, sa.AppointmentNumber, sa.Room__r.Name, sa.SchedStartTime, sa.SchedEndTime));
        }

        return appointments;
    }

    // Wrapper class to represent appointment data
    public class AppointmentWrapper {
        @AuraEnabled public String id;
        @AuraEnabled public String appointmentNumber;
        @AuraEnabled public String roomName;
        @AuraEnabled public DateTime startTime;
        @AuraEnabled public DateTime endTime;

        public AppointmentWrapper(Id id, String appointmentNumber, String roomName, DateTime startTime, DateTime endTime) {
            this.id = id;
            this.appointmentNumber = appointmentNumber;
            this.roomName = roomName;
            this.startTime = startTime;
            this.endTime = endTime;
        }
    }
}