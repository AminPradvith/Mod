@isTest
private class ImageUploadControllerTest {
    
    static testMethod void testSaveImageToSalesforce() {
        
        id rt=Schema.SObjectType.Account.getRecordTypeInfosByName().get('Franchisor').getRecordTypeId();
        
        Account acc = new Account(Name = 'Test Account',RecordTypeId= rt);
        insert acc;
        
       String base64Data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAAsTAAALEwEAmpwYAAABHUlEQVR4nGN8//8/AyVAiIiHgYGJgZGBkZQWRkZGKcIUGOgZ2enpbKQoEUA0QMgVgZGRkYK4A5gVQ0QIYiCYUBAOpDmQCzABBA3BvzB5oyM/DACBwzQMgoWMzAyM+IAELegHhLYHjBB8IBFgYOYHNYGAByAhzCNtIBAEphCQDAJAQAAFAEAgCk8FgAAAAASUVORK5CYII=';
        Id recordId = acc.Id;
        
        Test.startTest();
        String result = ImageUploadController.saveImageToSalesforce(base64Data, recordId);
        Test.stopTest();
        System.assertEquals('Image uploaded and flow launched successfully', result);
    }
    
    static testMethod void testSaveImageToSalesforce2() {
        
       String base64Data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAAsTAAALEwEAmpwYAAABHUlEQVR4nGN8//8/AyVAiIiHgYGJgZGBkZQWRkZGKcIUGOgZ2enpbKQoEUA0QMgVgZGRkYK4A5gVQ0QIYiCYUBAOpDmQCzABBA3BvzB5oyM/DACBwzQMgoWMzAyM+IAELegHhLYHjBB8IBFgYOYHNYGAByAhzCNtIBAEphCQDAJAQAAFAEAgCk8FgAAAAASUVORK5CYII='; 
        
        Test.startTest(); 
        String result = ImageUploadController.saveImageToSalesforce2(base64Data);
        Test.stopTest(); 
        
        System.assertNotEquals('Error uploading image:', result, 'Error occurred while uploading the image');
    }
   
}