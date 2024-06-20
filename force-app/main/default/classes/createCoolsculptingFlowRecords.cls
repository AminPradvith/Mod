public class createCoolsculptingFlowRecords {
	@InvocableMethod(label='Get Coolsculpting list from flow')
    
    public static void createCoolsculptingConsult(list<CoolSculpting__c> listCoolsculpting){
        System.debug(listCoolsculpting);
        List<CoolSculpting__c> insertList = new List<CoolSculpting__c>();
        for(CoolSculpting__c CS : listCoolsculpting)
        {
            CoolSculpting__c Cool  = new CoolSculpting__c();
            
            if( CS.Target_Comments__c != '' || 
               CS.Target_Transform_Comments__c != '' || 
               CS.Total_Transformation_Comments__c != '' || 
               CS.Target_Savings__c != NULL || 
               CS.Target_Transform_Savings__c != NULL || 
               CS.Total_Transformation_Savings__c != NULL || 
               CS.Target_Retail_Price__c != NULL || 
               CS.Target_Transform_Retail_Price__c != NULL || 
               CS.Total_Transformation_Retail_Price__c != NULL || 
               CS.Target_Patient_Price__c != NULL || 
               CS.Target_Transform_Patient_Price__c != NULL || 
               CS.Total_Transformation_Patient_Price__c != NULL)
            {
            	
                Cool.Name = 'Test Coolsculpting Consult';
                Cool.Target_Comments__c = CS.Target_Comments__c;
            	Cool.Target_Transform_Comments__c = CS.Target_Transform_Comments__c;
                Cool.Total_Transformation_Comments__c = CS.Total_Transformation_Comments__c;
                Cool.Target_Savings__c = CS.Target_Savings__c;
                Cool.Target_Transform_Savings__c = CS.Target_Transform_Savings__c;
                Cool.Total_Transformation_Savings__c = CS.Total_Transformation_Savings__c;
                Cool.Target_Retail_Price__c = CS.Target_Retail_Price__c;
                Cool.Target_Transform_Retail_Price__c = CS.Target_Transform_Retail_Price__c;
                Cool.Total_Transformation_Retail_Price__c = CS.Total_Transformation_Retail_Price__c;
                Cool.Target_Patient_Price__c = CS.Target_Patient_Price__c;
                Cool.Target_Transform_Patient_Price__c = CS.Target_Transform_Patient_Price__c;
                Cool.Total_Transformation_Patient_Price__c = CS.Total_Transformation_Patient_Price__c;
            	insertList.add(Cool);
            }
            
        }
        if (!insertList.isEmpty())
        {
            insert insertList;
        }
          
      }
}