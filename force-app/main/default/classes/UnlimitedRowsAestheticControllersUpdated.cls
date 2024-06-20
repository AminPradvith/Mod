public with sharing class UnlimitedRowsAestheticControllersUpdated {
    
    // Fetch recommendations based on record Id
    @AuraEnabled(cacheable=true)
    public static List<Esthetician_Coolsculpting_s__c> getRecommendations(Id recId) {
        return [SELECT Id, Area__c, Applicator__c,
                       Number__c, Minutes__c,
                       Notes__c
                FROM Esthetician_Coolsculpting_s__c
                WHERE Esthetician_Coolsculpting__c IN (SELECT Id FROM Aesthetician_Coolsculpting__c WHERE Chart__c = :recId)];
    
    }
    @AuraEnabled(cacheable=true)
    public static List<Hydrafacial_Treatment_s__c> getRecommendations2(Id recId) {
        return [SELECT Id, Location__c, Cleanser__c,
        Peel__c, Serum__c, Booster__c, Moisturizer__c, Notes__c
                FROM Hydrafacial_Treatment_s__c
                WHERE Hydrafacial_Treatment__c IN (SELECT Id FROM Hydrafacial_Treatment__c WHERE Chart__c = :recId)];
    
    }
    


    
    @AuraEnabled
    public static void updateRecommendations(List<Esthetician_Coolsculpting_s__c> recommendations) {
        try {
            update recommendations;
        } catch (Exception e) {
            throw new AuraHandledException('Error updating recommendations: ' + e.getMessage());
        }
    }
    @AuraEnabled
    public static void updateRecommendations2(List<Hydrafacial_Treatment_s__c> recommendations) {
        try {
            update recommendations;
        } catch (Exception e) {
            throw new AuraHandledException('Error updating recommendations: ' + e.getMessage());
        }
    }
    


 
    @AuraEnabled
    public static Map<String, List<String>> getPickList(String objApi, List<String> fieldApis) {
        Map<String, List<String>> picklistValuesMap = new Map<String, List<String>>();
        
        // Get the SObjectType from the objApi string
        Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(objApi);
        
        if (sObjectType != null) {
            // Iterate over each field API name
            for (String fieldApi : fieldApis) {
                List<String> picklistValues = new List<String>();
                Schema.DescribeFieldResult fieldResult = sObjectType.getDescribe().fields.getMap().get(fieldApi).getDescribe();
                
                // Iterate through picklist values and add them to the list
                for (Schema.PicklistEntry pickListVal : fieldResult.getPicklistValues()) {
                    picklistValues.add(pickListVal.getLabel());
                }
                
                // Add the picklist values to the map with the field API name as the key
                picklistValuesMap.put(fieldApi, picklistValues);
            }
        }
        system.debug(picklistValuesMap);
        return picklistValuesMap;
    }
 
    @AuraEnabled(cacheable=true)
    public static List<String> getMembershipPicklistValues() {
        List<String> picklistValues = new List<String>();
        Schema.DescribeFieldResult fieldResult = Esthetician_Coolsculpting_s__c.Area__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
 
        for (Schema.PicklistEntry entry : ple) {
            picklistValues.add(entry.getLabel());
        }
        return picklistValues;
    }
}