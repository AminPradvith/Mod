public class UnlimitedRowsAestheticControllers {

    @AuraEnabled
    public static void insertRecommendations(List<Map<String, Object>> jsonOfListOfRecommendations) {
        System.debug(JSON.serialize(jsonOfListOfRecommendations));
        System.debug(jsonOfListOfRecommendations.size());
        
    
List<Esthetician_Coolsculpting_s__c> CoolSList = new list<Esthetician_Coolsculpting_s__c>();
List<Hydrafacial_Treatment_s__c> HydraFList = new list<Hydrafacial_Treatment_s__c>();
List<Chemical_Peel_Treatment_s__c> ChemicalPList = new list<Chemical_Peel_Treatment_s__c>();
List<Thermage_Treatment_s__c> ThermageTList = new list<Thermage_Treatment_s__c>();
List<Facial_Treatment_s__c> FacialTList =  new list<Facial_Treatment_s__c>();
List<IPL_Treatment_s__c> IplTList =  new list<IPL_Treatment_s__c>();
List<Sculpsure_Treatments_s__c> SculpList =  new list<Sculpsure_Treatments_s__c>();




        
        for (Map<String, Object> m : jsonOfListOfRecommendations) {
 
            Esthetician_Coolsculpting_s__c Aes = new Esthetician_Coolsculpting_s__c();
            Hydrafacial_Treatment_s__c Hft = new 	Hydrafacial_Treatment_s__c();
            Chemical_Peel_Treatment_s__c Cpt = new Chemical_Peel_Treatment_s__c();
            Thermage_Treatment_s__c Tht = new Thermage_Treatment_s__c();
            Facial_Treatment_s__c Ft = new Facial_Treatment_s__c();
            IPL_Treatment_s__c IplT = new IPL_Treatment_s__c();
            Sculpsure_Treatments_s__c Scul = new Sculpsure_Treatments_s__c();



if(m.containsKey('Area__cValuessList')){
    List<object> productValuesList = (List<object>)m.get('Area__cValuessList');
    String joinedProductValues = String.join(productValuesList, ';');
    Aes.Area__c = joinedProductValues;
}
if(m.containsKey('Applicator__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Applicator__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    Aes.Applicator__c = joinedProductValues;
}
if (m.containsKey('Number__c')) {
    String num = (String)m.get('Number__c');
    if (num != null) {
        Aes.Number__c = num;
    }
}
if (m.containsKey('Minutes__c')) {
    String min = (String)m.get('Minutes__c');
    if (min != null) {
        Aes.Minutes__c = min;
    }
}
if (m.containsKey('Notes__c')) {
    String note = (String)m.get('Notes__c');
    if (note != null) {
        Aes.Notes__c = note;
    }
}
coolsList.add(aes);
if(m.containsKey('Location__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Location__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    Hft.Location__c = joinedProductValues;
}
if (m.containsKey('Cleanser__c')) {
    String cle = (String)m.get('Cleanser__c');
    if (cle != null) {
        Hft.Cleanser__c = cle;
    }
}
if (m.containsKey('Peel__c')) {
    String pee = (String)m.get('Peel__c');
    if (pee != null) {
        Hft.Peel__c = pee;
    }
}
if (m.containsKey('Extractions__c')) {
    Object value = m.get('Extractions__c'); // Retrieve the value from the map
    if (value instanceof Boolean) {
        Hft.Extractions__c = (Boolean)value; // If it's already a Boolean, simply assign it
    } else if (value instanceof String) {
        // If it's a String, convert it to Boolean
        Hft.Extractions__c = Boolean.valueOf((String)value);
    }
    System.debug('Extractions__c==>' + Hft.Extractions__c);
}




if (m.containsKey('Serum__c')) {
    Object value = m.get('Serum__c');
    if (value instanceof String) {
        String ser = (String) value;
        if (ser != null) {
            Hft.Serum__c = ser;
        }
    } else if (value instanceof Boolean) {
        // Handle Boolean value conversion if needed
        Boolean serBool = (Boolean) value;
        Hft.Serum__c = String.valueOf(serBool);
    }
}

if (m.containsKey('Booster__c')) {
    String boo = (String)m.get('Booster__c');
    if (boo != null) {
        Hft.Booster__c = boo;
    }
}
if (m.containsKey('Moisturizer__c')) {
    String moi = (String)m.get('Moisturizer__c');
    if (moi != null) {
        Hft.Moisturizer__c = moi;
    }
}
if (m.containsKey('Notes__c')) {
    String note = (String)m.get('Notes__c');
    if (note != null) {
        Hft.Notes__c = note;
    }
}
HydraFList.add(Hft);
if(m.containsKey('Location__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Location__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    Cpt.Location__c = joinedProductValues;
}
if(m.containsKey('Type__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Type__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    Cpt.Type__c = joinedProductValues;
}
if(m.containsKey('Cooling_Method__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Cooling_Method__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    Cpt.Cooling_Method__c = joinedProductValues;
}if(m.containsKey('Instructions__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Instructions__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    Cpt.Instructions__c = joinedProductValues;
}
if (m.containsKey('Peel__c')) {
    String peel = (String)m.get('Peel__c');
    if (peel!= null) {
        Cpt.Peel__c = peel;
    }
}
if (m.containsKey('Duration__c')) {
    String dur = (String)m.get('Duration__c');
    if (dur!= null) {
        Cpt.Duration__c = dur;
    }
}
if (m.containsKey('Notes__c')) {
    String note = (String)m.get('Notes__c');
    if (note!= null) {
        Cpt.Notes__c = note;
    }
}
ChemicalPList.add(Cpt);
 if (m.containsKey('Date__c')) {
                String dateString2 = (String)m.get('Date__c');
                List<String> onlyDate = dateString2.split(' 00:00:00');
                List<String> yearMonthDay = onlyDate[0].split('-');
                System.debug('yearMonthDay ' + yearMonthDay);
               
                if (yearMonthDay != null && yearMonthDay.size() == 3) {
                   
                    Integer year = Integer.valueOf(yearMonthDay[0]);
                    Integer month = Integer.valueOf(yearMonthDay[1]);
                    Integer day = Integer.valueOf(yearMonthDay[2]);
                    Tht.Date__c = Date.newInstance(year, month, day);
                    System.debug('Date__c ' + Tht.Date__c);
                   
                }
            }


if (m.containsKey('Pre_Tx_Weight__c')) {
    Object value = m.get('Pre_Tx_Weight__c'); // Get the value from the map

    if (value instanceof Decimal) {
        // If the value is already Decimal, no need for conversion
        Tht.Pre_Tx_Weight__c = (Decimal)value;
    } else if (value instanceof String) {
        // If the value is String, try to convert it to Decimal
        try {
            Tht.Pre_Tx_Weight__c = Decimal.valueOf((String)value);
        } catch (Exception e) {
            // Handle the case where the String cannot be converted to Decimal
            // For example, you can set a default value or log the error
            System.debug('Failed to convert string to Decimal: ' + value);
            // You might want to set a default value or handle this case differently
        }
    }
}



if (m.containsKey('Pre_Tx_Measurement__c')) {
    Object value = m.get('Pre_Tx_Measurement__c'); // Get the value from the map

    if (value instanceof Decimal) {
        // If the value is already Decimal, no need for conversion
        Tht.Pre_Tx_Measurement__c = (Decimal)value;
    } else if (value instanceof String) {
        // If the value is String, try to convert it to Decimal
        try {
            Tht.Pre_Tx_Measurement__c = Decimal.valueOf((String)value);
        } catch (Exception e) {
            // Handle the case where the String cannot be converted to Decimal
            // For example, you can set a default value or log the error
            System.debug('Failed to convert string to Decimal: ' + value);
            // You might want to set a default value or handle this case differently
        }
    }
}

if (m.containsKey('Pre_Tx_Waist_at_Umbilicus__c')) {
    Object value = m.get('Pre_Tx_Waist_at_Umbilicus__c'); // Get the value from the map

    if (value instanceof Decimal) {
        // If the value is already Decimal, no need for conversion
        Tht.Pre_Tx_Waist_at_Umbilicus__c = (Decimal)value;
    } else if (value instanceof String) {
        // If the value is String, try to convert it to Decimal
        try {
            Tht.Pre_Tx_Waist_at_Umbilicus__c = Decimal.valueOf((String)value);
        } catch (Exception e) {
            // Handle the case where the String cannot be converted to Decimal
            // For example, you can set a default value or log the error
            System.debug('Failed to convert string to Decimal: ' + value);
            // You might want to set a default value or handle this case differently
        }
    }
}



 if (m.containsKey('End__c')) {
                String dateString2 = (String)m.get('End__c');
                List<String> onlyDate = dateString2.split(' 00:00:00');
                List<String> yearMonthDay = onlyDate[0].split('-');
                System.debug('yearMonthDay ' + yearMonthDay);
               
                if (yearMonthDay != null && yearMonthDay.size() == 3) {
                   
                    Integer year = Integer.valueOf(yearMonthDay[0]);
                    Integer month = Integer.valueOf(yearMonthDay[1]);
                    Integer day = Integer.valueOf(yearMonthDay[2]);
                    Tht.End__c = Date.newInstance(year, month, day);
                    System.debug('End__c ' + Tht.End__c);
                   
                }
            }
  if (m.containsKey('Start__c')) {
                String dateString2 = (String)m.get('Start__c');
                List<String> onlyDate = dateString2.split(' 00:00:00');
                List<String> yearMonthDay = onlyDate[0].split('-');
                System.debug('yearMonthDay ' + yearMonthDay);
               
                if (yearMonthDay != null && yearMonthDay.size() == 3) {
                   
                    Integer year = Integer.valueOf(yearMonthDay[0]);
                    Integer month = Integer.valueOf(yearMonthDay[1]);
                    Integer day = Integer.valueOf(yearMonthDay[2]);
                    Tht.Start__c = Date.newInstance(year, month, day);
                    System.debug('Start__c ' + Tht.Start__c);
                   
                }
 }
 if(m.containsKey('Pain_Management__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Pain_Management__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    Tht.Pain_Management__c = joinedProductValues;
}
if(m.containsKey('Return_Pad_Area__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Return_Pad_Area__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    Tht.Return_Pad_Area__c = joinedProductValues;
}
if(m.containsKey('Return_Pad_Moved_to__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Return_Pad_Moved_to__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    Tht.Return_Pad_Moved_to__c = joinedProductValues;
}
if (m.containsKey('Lot_c__c')) {
    String lotc = (String)m.get('Lot_c__c');
    if (lotc!= null) {
        Tht.Lot_c__c = lotc;
    }
}
ThermageTList.add(Tht);

if(m.containsKey('Type__cValuesLists')){
    List<object> productValuesList = (List<object>)m.get('Type__cValuesLists');
    String joinedProductValues = String.join(productValuesList, ';');
    Ft.Type__c = joinedProductValues;
}
if(m.containsKey('Location__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Location__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    Ft.Location__c = joinedProductValues;
}
if (m.containsKey('Cleanser__c')) {
    String cle = (String)m.get('Cleanser__c');
    if (cle!= null) {
        Ft.Cleanser__c = cle;
    }
}
if (m.containsKey('Toner__c')) {
    String ton = (String)m.get('Toner__c');
    if (ton!= null) {
        Ft.Toner__c = ton;
    }
}

if (m.containsKey('Steam__c')) {
    Object steamValue = m.get('Steam__c');
    if (steamValue instanceof Boolean) {
        Ft.Steam__c = (Boolean)steamValue;
        System.debug('Steam__c==>' + Ft.Steam__c);
    } else if (steamValue instanceof String) {
        Ft.Steam__c = Boolean.valueOf((String)steamValue);
        System.debug('Steam__c==>' + Ft.Steam__c);
    }
}


if (m.containsKey('Extractions__c')) {
    Object value = m.get('Extractions__c'); // Retrieve the value from the map
    if (value instanceof Boolean) {
        Ft.Extractions__c = (Boolean)value; // If it's already a Boolean, simply assign it
    } else if (value instanceof String) {
        // If it's a String, convert it to Boolean
        Ft.Extractions__c = Boolean.valueOf((String)value);
    }
    System.debug('Extractions__c==>' + Ft.Extractions__c);
}






  if (m.containsKey('Mask__c')) {
    String mas = (String)m.get('Mask__c');
    if (mas!= null) {
        Ft.Mask__c = mas;
    }
}
if (m.containsKey('Moisturizer__c')) {
    String moi = (String)m.get('Moisturizer__c');
    if (moi!= null) {
        Ft.Moisturizer__c = moi;
    }
}
if (m.containsKey('Notes__c')) {
    String note = (String)m.get('Notes__c');
    if (note!= null) {
        Ft.Notes__c = note;
    }
}
            
FacialTList.add(Ft);

if(m.containsKey('Tx__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Tx__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    IplT.Tx__c = joinedProductValues;
}
if(m.containsKey('Area__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Area__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    IplT.Area__c = joinedProductValues;
}
if(m.containsKey('Handpiece__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Handpiece__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    IplT.Handpiece__c = joinedProductValues;
}
if (m.containsKey('SkinTel_c__c')) {
    String skte = (String)m.get('SkinTel_c__c');
    if (skte!= null) {
        IplT.SkinTel_c__c = skte;
    }
}
if (m.containsKey('Baseline_Skintel_c__c')) {
    String basel = (String)m.get('Baseline_Skintel_c__c');
    if (basel!= null) {
        IplT.Baseline_Skintel_c__c = basel;
    }
}
if (m.containsKey('Joules_c__c')) {
    String joul = (String)m.get('Joules_c__c');
    if (joul!= null) {
        IplT.Joules_c__c = joul;
    }
}
if (m.containsKey('Pulse_Width_c__c')) {
    String pulsw = (String)m.get('Pulse_Width_c__c');
    if (pulsw!= null) {
        IplT.Pulse_Width_c__c = pulsw;
    }
}
if (m.containsKey('Last_Skintel__c')) {
    String lasts = (String)m.get('Last_Skintel__c');
    if (lasts!= null) {
        IplT.Last_Skintel__c = lasts;
    }
}
if (m.containsKey('Notes__c')) {
    String note = (String)m.get('Notes__c');
    if (note!= null) {
        IplT.Notes__c = note;
    }
}
if(m.containsKey('Sunscreen_App__cValuesList')){
    List<object> productValuesList = (List<object>)m.get('Sunscreen_App__cValuesList');
    String joinedProductValues = String.join(productValuesList, ';');
    IplT.Sunscreen_App__c = joinedProductValues;
}

IplTList.add(IplT);

if (m.containsKey('Tx_Area__c')) {
    String txArea = (String)m.get('Tx_Area__c');
    if (txArea!= null) {
        Scul.Tx_Area__c = txArea;
    }
}
if (m.containsKey('Energy_in_Build__c')) {
    String enInB = (String)m.get('Energy_in_Build__c');
    if (enInB!= null) {
        Scul.Energy_in_Build__c = enInB;
    }
}
if (m.containsKey('End_Build_Zone__c')) {
    String endBz = (String)m.get('End_Build_Zone__c');
    if (endBz!= null) {
        Scul.End_Build_Zone__c = endBz;
    }
}
if (m.containsKey('Energy_Adj_Zo__c')) {
    String enAZ = (String)m.get('Energy_Adj_Zo__c');
    if (enAZ!= null) {
        Scul.Energy_Adj_Zo__c = enAZ;
    }
}
if (m.containsKey('PAC_1__c')) {
    String pac1 = (String)m.get('PAC_1__c');
    if (pac1!= null) {
        Scul.PAC_1__c = pac1;
    }
}
if (m.containsKey('PAC_2__c')) {
    String pac2 = (String)m.get('PAC_2__c');
    if (pac2!= null) {
        Scul.PAC_2__c = pac2;
    }
}
if (m.containsKey('PAC_3__c')) {
    String pac3 = (String)m.get('PAC_3__c');
    if (pac3!= null) {
        Scul.PAC_3__c = pac3;
    }
}
if (m.containsKey('PAC_4__c')) {
    String pac4 = (String)m.get('PAC_4__c');
    if (pac4!= null) {
        Scul.PAC_4__c = pac4;
    }
}
SculpList.add(Scul);

        }
  
        if (!CoolSList.isEmpty()) {
            insert CoolSList;
        }
        if (!HydraFList.isEmpty()) {
            insert HydraFList;
        }
        if (!ChemicalPList.isEmpty()) {
            insert ChemicalPList;
        }
         if (!ThermageTList.isEmpty()) {
            insert ThermageTList;
        }
        if (!FacialTList.isEmpty()) {
            insert FacialTList;
        }
        if (!IplTList.isEmpty()) {
            insert IplTList;
        }
         if (!SculpList.isEmpty()) {
            insert SculpList;
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
}