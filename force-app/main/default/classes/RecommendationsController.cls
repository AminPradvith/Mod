public with sharing class RecommendationsController {
    
    // Fetch recommendations based on record Id
    @AuraEnabled(cacheable=true)
    public static List<Recommendations_for_Aesthetic_consult__c> getRecommendations(Id recId) {
        return [SELECT Id, Aesthetic_consult_Membership__c, Aesthetic_consult_Products__c,
                       Aesthetic_consult_Treatments__c, Aesthetic_consult_Area__c,
                       Aesthetic_consult_units_syrings__c, Aesthetic_consult_Comments__c
                FROM Recommendations_for_Aesthetic_consult__c
                WHERE Esthetic_Consult_Recommendations__c IN (SELECT Id FROM Aesthetic_Consult_Recommendations__c WHERE Chart__c = :recId)];
    
    }

    @AuraEnabled(cacheable=true)
    public static List<Consult_Hair_Restoration__c> getRecommendations2(Id recId) {
        return [SELECT Id, HPI_Date__c, HPI_FUT_vs_FUE__c,
        HPI_No_of_Grafts__c, HPI_Year__c,
        HPI_Surgeon__c
                FROM Consult_Hair_Restoration__c
                WHERE Hair_Restoration_consult__c IN (SELECT Id FROM Hair_Restoration_consult__c WHERE Chart__c = :recId)];
    
    }


    @AuraEnabled(cacheable=true)
    public static List<Tattoo_Removal_Consult_S__c> getRecommendations3(Id recId) {
        return [SELECT Id, Tattoo_Removal_Skin_Type__c, Tattoo_Removal_Kirby_Score__c,Tattoo_Removal_Size__c,
        Tattoo_Removal_Location__c, Tattoo_Removal_Amount_of_Ink__c,Tattoo_Removal_Ink_Layering__c,
        Tattoo_Removal_Scarring_Tissue_Change__c,Tattoo_Removal_Colors__c,Tattoo_Removal_Tattoo_Type__c,Tattoo_Removal_Age__c,Tattoo_Removal_Notes__c
                FROM Tattoo_Removal_Consult_S__c
                WHERE Tattoo_Removal_Consult__c IN (SELECT Id FROM Tattoo_Removal_Consult__c WHERE Chart__c = :recId)];
    
    }

    // Update recommendations
    @AuraEnabled
    public static void updateRecommendations(List<Recommendations_for_Aesthetic_consult__c> recommendations) {
        try {
            update recommendations;
        } catch (Exception e) {
            throw new AuraHandledException('Error updating recommendations: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static void updateRecommendations2(List<Consult_Hair_Restoration__c> hair) {
        try {
            update hair;
        } catch (Exception e) {
            throw new AuraHandledException('Error updating hair: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static void updateRecommendations3(List<Tattoo_Removal_Consult_S__c> tattooRemoval) {
        try {
            update tattooRemoval;
        } catch (Exception e) {
            throw new AuraHandledException('Error updating tattooRemoval: ' + e.getMessage());
        }
    }
   
}