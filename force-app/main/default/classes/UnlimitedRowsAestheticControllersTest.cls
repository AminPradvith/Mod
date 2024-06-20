@isTest
public class UnlimitedRowsAestheticControllersTest {

    @isTest

    static void testMethod1() {

        String jsonString = '[{"Lot_c__c":"","Start__c":"","End__c":"","Date__c":"","Return_Pad_Moved_to__cValuesList":[],"Return_Pad_Moved_to__c":false,"Return_Pad_Moved_to__cValues":"","Return_Pad_Area__cValuesList":[],"Return_Pad_Area__c":false,"Return_Pad_Area__cValues":"","Pain_Management__cValuesList":[],"Pain_Management__c":false,"Pain_Management__cValues":"","Duration__c":"","Instructions__cValuesList":[],"Instructions__c":false,"Instructions__cValues":"","Cooling_Method__cValuesList":[],"Cooling_Method__c":false,"Cooling_Method__cValues":"","Type__cValuesList":[],"Type__c":false,"Type__cValues":"","Moisturizer__c":"","Booster__c":"","Serum__c":"","Extractions__c":"","Peel__c":"","Cleanser__c":"","Location__cValuesList":[],"Location__c":false,"Location__cValues":"","Notes__c":"","Minutes__c":"","Number__c":"","Applicator__cValuesList":["Coolcurve"],"Applicator__c":false,"Applicator__cValues":"Coolcurve","Area__cValuessList":["Arms"],"Area__c":false,"Area__cValuess":"Arms","index":1}]';

        List<Map<String, Object>> result = UnlimitedRowsAestheticControllersTest.convertJsonToMap(jsonString);

        UnlimitedRowsAestheticControllers.insertRecommendations(result);

    }
     @isTest
     static void testMethod2() {

        String jsonString = '[{"PAC_4__c":"df","PAC_3__c":"asdf","PAC_2__c":"dsf","PAC_1__c":"sdfasdf","Energy_Adj_Zo__c":"","End_Build_Zone__c":"sadf","Energy_in_Build__c":"adsasdf","Tx_Area__c":"adf","Last_Skintel__c":"","Pulse_Width_c__c":"","Joules_c__c":"","Baseline_Skintel_c__c":"","SkinTel_c__c":"","Sunscreen_App__cValuesLists":[],"Sunscreen_App__c":false,"Sunscreen_App__cValues":"","Handpiece__cValuesLists":[],"Handpiece__c":false,"Handpiece__cValues":"","Area__cValuesLists":[],"Area__c":false,"Area__cValues":"","Tx__cValuesLists":[],"Tx__c":false,"Tx__cValues":"","Notes__c":"","Moisturizer__c":"","Mask__c":"","Extractions__c":"","Steam__c":"","Toner__c":"","Cleanser__c":"","Location__cValuesList":[],"Location__c":false,"Location__cValues":"","Type__cValuesLists":[],"Type__c":false,"Type__cValues":"","index":1}]';

        List<Map<String, Object>> result = UnlimitedRowsAestheticControllersTest.convertJsonToMap(jsonString);

        UnlimitedRowsAestheticControllers.insertRecommendations(result);

    }
        @isTest
     static void testMethod3() {

        String jsonString = '[{"Sunscreen_App__cValuesList":["Yes"],"Handpiece__cValuesList":["Yellow"],"Area__cValuesList":["Neck"],"Tx__cValuesList":["2"],"PAC_4__c":"","PAC_3__c":"","PAC_2__c":"","PAC_1__c":"","Energy_Adj_Zo__c":"","End_Build_Zone__c":"","Energy_in_Build__c":"","Tx_Area__c":"","Last_Skintel__c":"we","Pulse_Width_c__c":"asd","Joules_c__c":"dsasd","Baseline_Skintel_c__c":"dsfa","SkinTel_c__c":"sf","Sunscreen_App__cValuesLists":[],"Sunscreen_App__c":false,"Sunscreen_App__cValues":"Yes","Handpiece__cValuesLists":[],"Handpiece__c":false,"Handpiece__cValues":"Yellow","Area__cValuesLists":[],"Area__c":false,"Area__cValues":"Neck","Tx__cValuesLists":[],"Tx__c":false,"Tx__cValues":"2","Notes__c":"asd","Moisturizer__c":"","Mask__c":"","Extractions__c":"","Steam__c":"","Toner__c":"","Cleanser__c":"","Location__cValuesList":[],"Location__c":false,"Location__cValues":"","Type__cValuesLists":[],"Type__c":false,"Type__cValues":"","index":1}]';

        List<Map<String, Object>> result = UnlimitedRowsAestheticControllersTest.convertJsonToMap(jsonString);

        UnlimitedRowsAestheticControllers.insertRecommendations(result);

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

        Map<String, List<String>> result = UnlimitedRowsAestheticControllers.getPickList(objApi, fieldApis);

        Test.stopTest();

    }

}