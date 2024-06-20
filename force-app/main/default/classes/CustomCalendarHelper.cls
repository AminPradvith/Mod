public with sharing class CustomCalendarHelper {
    @AuraEnabled
    public static List<ServiceAppointment> getEvents(
        String recordId,
        String childObject,
        String parentFieldName,
        String startDatetimeField,
        String endDatetimeField,
        String titleField,
        Date startDate,
        Date endDate) {

        if (
            recordId == null ||
            childObject == null ||
            parentFieldName == null ||
            startDatetimeField == null ||
            endDatetimeField == null ||
            titleField == null
        ) {
            throw new AuraHandledException('Missing Config');
        }

        DateTime startDateTime = DateTime.newInstance(startDate.year(), startDate.month(), startDate.day());
        DateTime endDateTime = DateTime.newInstance(endDate.year(), endDate.month(), endDate.day());
        
        String query = 'SELECT Id, ' + titleField + ', ' + startDatetimeField + ', ' + endDatetimeField;
        query += ' FROM ' + childObject;
        query += ' WHERE ' + startDatetimeField + ' >= :startDateTime';
        query += ' AND ' + endDatetimeField + ' <= :endDateTime';
        System.debug(query);
        return Database.query(query);
    }
}