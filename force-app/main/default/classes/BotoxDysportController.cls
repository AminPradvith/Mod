public class BotoxDysportController {
    @InvocableMethod(label='Create Botox Dysport')
    public static List<Id> createBotoxDysport(List<Botox_Dysport__c> listBotox) {
            System.debug('Received listBotox: ' + listBotox);
        List<Botox_Dysport__c> insertList = new List<Botox_Dysport__c>();
        List<Id> insertedIds = new List<Id>();
        
        // Insert records
        for(Botox_Dysport__c bot : listBotox) {
                   System.debug('Processing Botox_Dysport__c record: ' + bot);
            Botox_Dysport__c bd = new Botox_Dysport__c();
            
            if(bot.Injectable_Notes_Botox_Dysport__c != '') {
                bd.Injectable_Notes_Botox_Dysport__c = bot.Injectable_Notes_Botox_Dysport__c;
                bd.Chart__c = bot.Chart__c;
                insertList.add(bd);
            }
        }
        insert insertList;
        System.debug('insertList'+insertList);
        // Retrieve IDs of inserted records
        for(Botox_Dysport__c insertedRecord : insertList) {
            insertedIds.add(insertedRecord.Id);
        }
        
          System.debug('insertList'+insertedIds);
        return insertedIds;
    }
}