@isTest
public class UnlimitedRowsDynamicUiControllerTest {
    
    @isTest
    static void testMethod1() {
        String jsonString = '[{"Tattoo_Removal_Notes__c":"","Tattoo_Removal_Size__cValuesList":[],"Tattoo_Removal_Size__c":false,"Tattoo_Removal_Size__cValues":"","Tattoo_Removal_Age__cValuesList":[],"Tattoo_Removal_Age__c":false,"Tattoo_Removal_Age__cValues":"","Tattoo_Removal_Tattoo_Type__cValuesList":[],"Tattoo_Removal_Tattoo_Type__c":false,"Tattoo_Removal_Tattoo_Type__cValues":"","Tattoo_Removal_Kirby_Score__c":"","Tattoo_Removal_Colors__cValuesList":[],"Tattoo_Removal_Colors__c":false,"Tattoo_Removal_Colors__cValues":"","Tattoo_Removal_Scarring_Tissue_Change__cValuesList":[],"Tattoo_Removal_Scarring_Tissue_Change__c":false,"Tattoo_Removal_Scarring_Tissue_Change__cValues":"","Tattoo_Removal_Ink_Layering__cValuesList":[],"Tattoo_Removal_Ink_Layering__c":false,"Tattoo_Removal_Ink_Layering__cValues":"","Tattoo_Removal_Amount_of_Ink__cValuesList":[],"Tattoo_Removal_Amount_of_Ink__c":false,"Tattoo_Removal_Amount_of_Ink__cValues":"","Tattoo_Removal_Location__cValuesList":[],"Tattoo_Removal_Location__c":false,"Tattoo_Removal_Location__cValues":"","Tattoo_Removal_Skin_Type__cValuesList":[],"Tattoo_Removal_Skin_Type__c":false,"Tattoo_Removal_Skin_Type__cValues":"","HPI_Surgeon__c":"","HPI_Year__c":"","HPI_No_of_Grafts__c":"","HPI_Date__c":"","HPI_FUT_vs_FUE__cValuesList":[],"HPI_FUT_vs_FUE__c":false,"HPI_FUT_vs_FUE__cValues":"","comments":"Testing","Units_Syringe":"12","AreaValuesList":["Glabellar"],"Aesthetic_consult_Area__c":false,"AreaValues":"Glabellar","TreatmentValuesList":["B12"],"Aesthetic_consult_Treatments__c":false,"TreatmentValues":"B12","ProductValuesList":["Age Rewind Eye & Lip Infused Serum-912"],"Aesthetic_consult_Products__c":false,"ProductValues":"Age Rewind Eye & Lip Infused Serum-912","MembershipValuesList":["Already a Member"],"Aesthetic_consult_Membership__c":false,"MembershipValues":"Already a Member","index":1}]';
        List<Map<String, Object>> result = UnlimitedRowsDynamicUiControllerTest.convertJsonToMap(jsonString);
        UnlimitedRowsDynamicUiController.insertRecommendations(result);
    }
    
    @isTest
    static void testMethod2() {
        String jsonString = '[{"Facial_Notes__c":"","Facial_Moisturizer__c":"","Facial_Mask__c":"","Facial_Extractions__c":false,"Facial_Steam__c":false,"Facial_Toner__c":"","Facial_Cleanser__c":"","Facial_Location__cValuesList":[],"Facial_Location__c":false,"Facial_Location__cValues":"","Facial_Type__cValuesList":[],"Facial_Type__c":false,"Facial_Type__cValues":"","Emsculpt_date__c":"","Emsculpt_Tx_Time__cValuesList":[],"Emsculpt_Tx_Time__c":false,"Emsculpt_Tx_Time__cValues":"","Emsculpt_Power_Used__c":"","Emsculpt_Notes__c":"","Emsculpt_body_area__cValuesList":[],"Emsculpt_body_area__c":false,"Emsculpt_body_area__cValues":"","Dermal_Filler_Procedure_Expiration__c":"","Dermal_Filler_Procedure_Lot__c":"","Dermal_Filler_Procedure_Reconstituted__cValuesList":[],"Dermal_Filler_Procedure_Reconstituted__c":false,"Dermal_Filler_Procedure_Reconstituted__cValues":"","Dermal_Filler_Procedure_Units_Syringes__c":"","Dermal_Filler_Procedure_Injectable__cValuesList":[],"Dermal_Filler_Procedure_Injectable__c":false,"Dermal_Filler_Procedure_Injectable__cValues":"","Dermal_Filler_Procedure_Area__cValuesList":[],"Dermal_Filler_Procedure_Area__c":false,"Dermal_Filler_Procedure_Area__cValues":"","Botox_Dysport_Procedure_Expiration__c":"qew","Botox_Dysport_Procedure_Lot__c":"wde","Botox_Dysport_Procedure_Reconstituted__cValuesList":["2.2ml"],"Botox_Dysport_Procedure_Reconstituted__c":false,"Botox_Dysport_Procedure_Reconstituted__cValues":"2.2ml","Botox_Dysport_Procedure_Units_Syringes__c":"test4","Botox_Dysport_Procedure_Injectable__cValuesList":["Botox"],"Botox_Dysport_Procedure_Injectable__c":false,"Botox_Dysport_Procedure_Injectable__cValues":"Botox","Botox_Dysport_Injectable_Procedure_Area__cValuesList":[""],"Botox_Dysport_Injectable_Procedure_Area__c":false,"Botox_Dysport_Injectable_Procedure_Area__cValues":"","index":1}]';
        List<Map<String, Object>> result = UnlimitedRowsDynamicUiControllerTest.convertJsonToMap(jsonString);
        UnlimitedRowsDynamicUiController.insertRecommendations(result);
    }
    
    @isTest
    static void testMethod3() {
        String jsonString = '[{"Lot_number__c":"","Expiration_number__c":"","Total_dosage__c":"","Number_Of_Injections__c":"","Sunscreen_applied__cValuesList":[],"Sunscreen_applied__c":false,"Sunscreen_applied__cValues":"","Notes__c":"","Last_skintel__c":"","Pulse_width__c":"","Joules__c":"","Baseline_Skintel__c":"","IPL_skinTel__c":"","Handpiece__cValuesList":[],"Handpiece__c":false,"Handpiece__cValues":"","Area__cValuesList":[],"Area__c":false,"Area__cValues":"","IPL_Tx__cValuesList":[],"IPL_Tx__c":false,"IPL_Tx__cValues":"","Hydrafacial_Notes__c":"","Hydrafacial_Moisturizer__c":"","Hydrafacial_Booster__c":"","Hydrafacial_Serum__c":"","Hydrafacial_Extractions__c":false,"Hydrafacial_Peel__c":"","Hydrafacial_Cleanser__c":"","Hydrafacial_Location__cValuesList":[],"Hydrafacial_Location__c":false,"Hydrafacial_Location__cValues":"","Fractional_Laser_passes_completed__cValuesList":["2"],"Fractional_Laser_passes_completed__c":false,"Fractional_Laser_passes_completed__cValues":"2","Fractional_Laser_notes__c":"fvdbbvdbgnb","Fractional_Laser_HA_serum_applied__cValuesList":["Yes"],"Fractional_Laser_HA_serum_applied__c":false,"Fractional_Laser_HA_serum_applied__cValues":"Yes","Fractional_Laser_ice_roller_applied__cValuesList":["Yes"],"Fractional_Laser_ice_roller_applied__c":false,"Fractional_Laser_ice_roller_applied__cValues":"Yes","Fractional_Laser_pulses_ms__cValuesList":["15"],"Fractional_Laser_pulses_ms__c":false,"Fractional_Laser_pulses_ms__cValues":"15","Fractional_Laser_joules__cValuesList":["10"],"Fractional_Laser_joules__c":false,"Fractional_Laser_joules__cValues":"10","Fractional_Laser_tip__cValuesList":["XD"],"Fractional_Laser_tip__c":false,"Fractional_Laser_tip__cValues":"XD","Fractional_Laser_area__cValuesList":["Neck"],"Fractional_Laser_area__c":false,"Fractional_Laser_area__cValues":"Neck","Fractional_Laser_Tx__c":"hello","index":1}]';
        List<Map<String, Object>> result = UnlimitedRowsDynamicUiControllerTest.convertJsonToMap(jsonString);
        UnlimitedRowsDynamicUiController.insertRecommendations(result);
    }
    
    
    @isTest
    static void testMethod4() {
        String jsonString = '[{"Dilution__cValueList":[],"Dilution__c":false,"Dilution__cValues":"","Reconstitution__c":"","Expiration_date__c":"","Lot__c":"","of_vials__c":"","Injectables__cValueList":[],"Injectables__c":false,"Injectables__cValues":"","Instructions__cValueList":[],"Instructions__c":false,"Instructions__cValues":"","Cooling_method__cValueList":[],"Cooling_method__c":false,"Cooling_method__cValues":"","Duration__c":"","Type__cValueList":[],"Type__c":false,"Type__cValues":"","Location__cValueList":[],"Location__c":false,"Location__cValues":"","Peel__c":"","Medications__cValuesList":[],"Medications__c":false,"Medications__cValues":"","Care__cValuesList":[],"Care__c":false,"Care__cValues":"","Effect__cValuesList":[],"Effect__c":false,"Effect__cValues":"","Post_op__c":"","Wand__c":"","Vacuum_setting__c":"","Pass__cValuesList":[],"Pass__c":false,"Pass__cValues":"","Zone__cValuesList":[],"Zone__c":false,"Zone__cValues":"","Area__cValueList":[],"Ice_roller_used__cValuesList":[],"Ice_roller_used__c":false,"Ice_roller_used__cValues":"","Baseline_skintell__c":"","Jelly_applied__cValuesList":[],"Jelly_applied__c":false,"Jelly_applied__cValues":"","ms__c":"","Spot_size__cValuesList":[],"Spot_size__c":false,"Spot_size__cValues":"","Area__cValuesLists":[],"Area__c":"","Area__cValues":"","Notes__c":"1","Skin_type__c":"1","Baseline_Skintel__c":"1","Skintel__c":"2","Passes__c":"ww","Pulse_width__c":"w","Joules__c":"test1","Tip__cValuesList":["Large Opctic"],"Tip__c":false,"Tip__cValues":"Large Opctic","Treatment__c":"213123","Laser_Hair_Removal_area__cValuesList":["Upper Back"],"Laser_Hair_Removal_area__c":false,"Laser_Hair_Removal_area__cValues":"Upper Back","index":1}]';
        List<Map<String, Object>> result = UnlimitedRowsDynamicUiControllerTest.convertJsonToMap(jsonString);
        UnlimitedRowsDynamicUiController.insertRecommendations(result);
    }
    
    @isTest
    static void testMethod5() {
        String jsonString = '[{"Instructions__cValuesList":["do not pick at exfoliating skin"],"Cooling_method__cValuesList":["Vitamin C gel"],"Type__cValuesList":["Glycolic Peel"],"Location__cValuesList":["Full Face"],"Dilution__cValueList":[],"Dilution__c":false,"Dilution__cValues":"","Reconstitution__c":"","Expiration_date__c":"","Lot__c":"","of_vials__c":"","Injectables__cValueList":[],"Injectables__c":false,"Injectables__cValues":"","Instructions__cValueList":[],"Instructions__c":false,"Instructions__cValues":"do not pick at exfoliating skin","Cooling_method__cValueList":[],"Cooling_method__c":false,"Cooling_method__cValues":"Vitamin C gel","Duration__c":"lk","Type__cValueList":[],"Type__c":false,"Type__cValues":"Glycolic Peel","Location__cValueList":[],"Location__c":false,"Location__cValues":"Full Face","Peel__c":"wew","Medications__cValuesList":[],"Medications__c":false,"Medications__cValues":"","Care__cValuesList":[],"Care__c":false,"Care__cValues":"","Effect__cValuesList":[],"Effect__c":false,"Effect__cValues":"","Post_op__c":"","Wand__c":"","Vacuum_setting__c":"","Pass__cValuesList":[],"Pass__c":false,"Pass__cValues":"","Zone__cValuesList":[],"Zone__c":false,"Zone__cValues":"","Area__cValueList":[],"Ice_roller_used__cValuesList":[],"Ice_roller_used__c":false,"Ice_roller_used__cValues":"","Baseline_skintell__c":"","Jelly_applied__cValuesList":[],"Jelly_applied__c":false,"Jelly_applied__cValues":"","ms__c":"","Spot_size__cValuesList":[],"Spot_size__c":false,"Spot_size__cValues":"","Area__cValuesLists":[],"Area__c":"","Area__cValues":"","Notes__c":"5","Skin_type__c":"","Baseline_Skintel__c":"","Skintel__c":"","Passes__c":"","Pulse_width__c":"","Joules__c":"","Tip__cValuesList":[],"Tip__c":false,"Tip__cValues":"","Treatment__c":"","Laser_Hair_Removal_area__cValuesList":[],"Laser_Hair_Removal_area__c":false,"Laser_Hair_Removal_area__cValues":"","index":1}]';
        List<Map<String, Object>> result = UnlimitedRowsDynamicUiControllerTest.convertJsonToMap(jsonString);
        UnlimitedRowsDynamicUiController.insertRecommendations(result);
    }
    
    
    
    
    public static List<Map<String, Object>> convertJsonToMap(String jsonString) {
        // Deserialize the JSON string to a List<Map<String, Object>>
        List<Object> objList = (List<Object>) JSON.deserializeUntyped(jsonString);
        
        // Convert the list of objects to a list of maps
        List<Map<String, Object>> resultList = new List<Map<String, Object>>();
        for (Object obj : objList) {
            if (obj instanceof Map<String, Object>) {
                resultList.add((Map<String, Object>) obj);
            }
        }
        return resultList;
    }
    
    
    @isTest
    static void testGetPickList() {
        // Prepare test data
        String objApi = 'Account';
        List<String> fieldApis = new List<String>{'Industry', 'Type'};
            
            // Call the method
            Test.startTest();
        Map<String, List<String>> result = UnlimitedRowsDynamicUiController.getPickList(objApi, fieldApis);
        Test.stopTest();
        
    }
}