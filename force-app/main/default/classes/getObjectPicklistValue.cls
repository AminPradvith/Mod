public class getObjectPicklistValue {
    @AuraEnabled(cacheable=true)
    public static Map<String, List<String>> getPicklistValues() {
        
        Map<String, List<String>> picklistValuesMap = new Map<String, List<String>>();
        List<Schema.PicklistEntry> AllPickListValue = new List<Schema.PicklistEntry>();
        
        Schema.SObjectType objType = Schema.getGlobalDescribe().get('Aesthetic_Consult_Recommendations__c');
        system.debug('objType  '+ objType);
        
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        system.debug('objDescribe  '+ objDescribe);
        
        List<String> fieldApiNames = new List<String>{'Aesthetic_consult_Membership__c','Aesthetic_consult_Area__c','Aesthetic_consult_Treatments__c','Aesthetic_consult_Products__c'};
                    
            // Iterate through the field API names and get their descriptions
            for (String fieldApiName : fieldApiNames) {
                if (objDescribe.fields.getMap().containsKey(fieldApiName)) {
                    Schema.DescribeFieldResult fieldInfo = objDescribe.fields.getMap().get(fieldApiName).getDescribe();

                    system.debug('Field: ' + fieldApiName + ', Field Info: ' + fieldInfo);
                    
                    List<Schema.PicklistEntry> picklistValues = fieldInfo.getPicklistValues();
                    List<String> picklistValuesStr = new List<String>();
                    for (Schema.PicklistEntry pickVal : picklistValues) {
                        system.debug('Field: ' + fieldApiName + ', Picklist Value: ' + pickVal.getValue());
                        picklistValuesStr.add(pickVal.getValue());
                    }
                    system.debug('Field: ' + fieldApiName + ', Picklist Values: ' + picklistValuesStr);
                    picklistValuesMap.put(fieldApiName, picklistValuesStr);

                } else {
                    system.debug('Field not found: ' + fieldApiName);
                }
            }         
    
   			system.debug('picklistValuesMap  '+picklistValuesMap);
        
    /* Schema.DescribeSObjectResult describeResult = Aesthetic_Consult_Recommendations__c.SObjectType.getDescribe();
system.debug('describeResult  '+describeResult);

Map<String, Schema.SObjectField> fieldsMap = describeResult.fields.getMap();
system.debug('fieldsMap  '+fieldsMap);

for (String fieldName : fieldsMap.keySet()) {
system.debug('fieldName  '+fieldName);

Schema.DescribeFieldResult fieldResult = fieldsMap.get(fieldName).getDescribe();
system.debug('fieldResult  '+fieldResult);

if (fieldResult.getType() == Schema.DisplayType.PICKLIST) {
List<String> picklistValues = new List<String>();

// Retrieve the picklist values
List<Schema.PicklistEntry> entries = fieldResult.getPicklistValues();
for (Schema.PicklistEntry entry : entries) {
picklistValues.add(entry.getLabel());
}

// Add the picklist values to the map
picklistValuesMap.put(fieldName, picklistValues);
}
}
*/
    
    return picklistValuesMap;
}
    
    @AuraEnabled(cacheable=true)
    public static List<String> getPicklistValuesNew(String objectApiName, String fieldName) {
        List<String> picklistValues = new List<String>();
        Schema.DescribeFieldResult fieldResult = Schema.getGlobalDescribe().get(objectApiName).getDescribe().fields.getMap().get(fieldName).getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry f : ple) {
            picklistValues.add(f.getLabel());
        }
        return picklistValues;
    }
}