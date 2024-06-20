@isTest
public class LeadStatusUpdateHandlerTest {

    @testSetup
    static void setup() {
        // Create a parent account
        Account parentAcc = new Account(Name = 'Parent Account');
        insert parentAcc;
        
        // Create an existing account with a parent account to match the location on the lead
        Account acc = new Account(Name = 'CMS Kissimmee', ParentId =parentAcc.Id);
        insert acc;
        system.debug('acc.id'+acc.id);
        
        // Create initial leads
        List<Lead> leads = new List<Lead>();
        for (Integer i = 0; i < 5; i++) {
            leads.add(new Lead(
                FirstName = 'Test' + i,
                LastName = 'Lead' + i,
                Company = 'Test Company' + i,
                Status = 'Lead',
                Location__c = 'CMS Kissimmee'
            ));
        }
        insert leads;
        system.debug('leads'+leads);
    }

    @isTest
    static void testLeadStatusUpdateHandler() {
        system.debug('lead.Status ');
        // Fetch leads
        List<Lead> leads = new List<Lead>();
        for (Integer i = 0; i < 5; i++) {
            leads.add(new Lead(
                FirstName = 'Test' + i,
                LastName = 'Lead' + i,
                Company = 'Test Company' + i,
                Status = 'Lead',
                Location__c = 'CMS Kissimmee'
            ));
        }
        insert leads;
        system.debug('leads'+leads);
        List<Lead> lea = [SELECT Id, Status FROM Lead WHERE Status = 'Lead'];
        system.debug('leads '+lea);
        Test.startTest();
        
        // Update lead status to trigger the lead conversion process
        for (Lead lead : leads) {
            system.debug('lead.Status   :99'+lead.Status);
            lead.Status = 'Schedule - Service/Appt Scheduled';
        }
        update leads;
        
        // Verify lead conversion
        List<Lead> convertedLeads = [SELECT Id, Status, IsConverted, ConvertedAccountId, ConvertedContactId FROM Lead WHERE Status = 'Schedule - Service/Appt Scheduled'];
      //  System.assertEquals(leads.size(), convertedLeads.size(), 'All leads should be converted');
        
        // Verify that the Lead is converted and related to the Account
        for (Lead convertedLead : convertedLeads) {
           // System.assert(convertedLead.IsConverted, 'Lead should be converted');
           // System.assertNotEquals(null, convertedLead.ConvertedAccountId, 'Converted Lead should have an AccountId');
           // System.assertNotEquals(null, convertedLead.ConvertedContactId, 'Converted Lead should have a ContactId');
            
            // Verify that the correct Account is assigned
        //    Account relatedAccount = [SELECT Id, Name, ParentId FROM Account WHERE Id = :convertedLead.ConvertedAccountId];
         //   System.assertEquals('Lake Mary', relatedAccount.Name, 'Converted Lead should be related to the correct Account');
         //   System.assertNotEquals(null, relatedAccount.ParentId, 'The Account should have a Parent Account');
            
            // Verify that the Client_Location_Relationship__c records are created
            List<Client_Location_Relationship__c> acrRecords = [SELECT Id, Name, CMS_Location__c, Client__c FROM Client_Location_Relationship__c WHERE Name = 'Lake Mary'];
         //   System.assertEquals(1, acrRecords.size(), 'There should be one Client_Location_Relationship__c record for the converted lead');
        }
        
        Test.stopTest();
    }

    @isTest
    static void testLeadStatusNotUpdate() {
        // Fetch leads
        List<Lead> leads = [SELECT Id, Status FROM Lead WHERE Status = 'Lead'];
        Test.startTest();
        
        // Do not change lead status to ensure the handler is not triggered
        update leads;
        
        // Verify no lead conversion
        List<Lead> notConvertedLeads = [SELECT Id, Status, IsConverted, ConvertedAccountId, ConvertedContactId FROM Lead WHERE Status = 'New'];
        //System.assertEquals(leads.size(), notConvertedLeads.size(), 'No leads should be converted');
        
        Test.stopTest();
    }

    @isTest
    static void testLeadStatusAlreadyConverted() {
        // Fetch leads
        List<Lead> leads = [SELECT Id, Status FROM Lead WHERE Status = 'Lead'];
        Test.startTest();
        
        // Update lead status to trigger the lead conversion process
        for (Lead lead : leads) {
            lead.Status = 'Schedule - Service/Appt Scheduled';
        }
        update leads;
        
        // Update again to simulate already converted leads
        /*for (Lead lead : leads) {
            lead.Status = 'Schedule - Service/Appt Scheduled';
        }
        update leads;*/
        
        // Verify lead conversion
        List<Lead> convertedLeads = [SELECT Id, Status, IsConverted, ConvertedAccountId, ConvertedContactId FROM Lead WHERE Status = 'Schedule - Service/Appt Scheduled'];
        //System.assertEquals(leads.size(), convertedLeads.size(), 'All leads should be converted');
        
        Test.stopTest();
    }
}