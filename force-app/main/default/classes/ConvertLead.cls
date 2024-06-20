public class ConvertLead {
    @InvocableMethod
public static void handleLeadStatusUpdate(List<Id> leadIds) {
        
        for(id i:leadIds){
            
            String leadId = i; 
            
            
            Database.LeadConvert leadConvert = new Database.LeadConvert();
            leadConvert.setLeadId(leadId);
            
            
            leadConvert.setDoNotCreateOpportunity(false); 
            
            leadConvert.setConvertedStatus('Member'); // Set the appropriate converted status
            
            Database.LeadConvertResult leadConvertResult = Database.convertLead(leadConvert);
            
            
            if (leadConvertResult.isSuccess()) {
                
                System.debug('Lead converted successfully!');
                
            } else {
                
                System.debug('Lead conversion failed: ' + leadConvertResult.getErrors()[0].getMessage());
            }
        }
        
        
    }
}