public class ContactTriggerHandler { 
    public static void handleAfterInsert(List<Contact> newContacts){
        List<Opportunity> opportunitiesToCreate = new List<Opportunity>();
        
        // Map to store membership types and their corresponding Opportunities
        Map<String, List<Opportunity>> membershipTypeOppMap = new Map<String, List<Opportunity>>();
        
        for (Contact con : newContacts) {
            // Check if Contact has selected membership types
            if (con.Membership_Type__c != null && !String.isEmpty(con.Membership_Type__c)) { 
                for (String membershipType : con.Membership_Type__c.split(';')) {
                    // Create an Opportunity for each selected membership type
                    Opportunity opp = new Opportunity(
                        Name = 'Opportunity for ' + con.LastName + membershipType,
                        ContactId = con.Id,
                        StageName = 'Prospecting', 
                        CloseDate = Date.today().addDays(30), 
                        Opp_Membership_Type__c = membershipType // Set custom picklist value
                    );
                    
                    // Add the opportunity to the map
                    if (!membershipTypeOppMap.containsKey(membershipType)) {
                        membershipTypeOppMap.put(membershipType, new List<Opportunity>{opp});
                    } else {
                        membershipTypeOppMap.get(membershipType).add(opp);
                    }
                }
            }
        }
        
        // Add opportunities from the map to the list to be inserted
        for (List<Opportunity> oppList : membershipTypeOppMap.values()) {
            opportunitiesToCreate.addAll(oppList);
        }
        
        if (!opportunitiesToCreate.isEmpty()) {
            insert opportunitiesToCreate;
        }
    }
    
    public static void handleAfterUpdate(Map<Id, Contact> oldMap, List<Contact> updatedContacts) {
        List<Opportunity> opportunitiesToCreate = new List<Opportunity>();
        
        // Iterate through updated contacts
        for (Contact con : updatedContacts) {
            Contact oldCon = oldMap.get(con.Id);
            Set<String> oldMembershipTypes = new Set<String>();
            Set<String> newMembershipTypes = new Set<String>();
            
            // Extract old and new membership types
            if (oldCon.Membership_Type__c != null) {
                oldMembershipTypes.addAll(oldCon.Membership_Type__c.split(';'));
            }
            if (con.Membership_Type__c != null) {
                newMembershipTypes.addAll(con.Membership_Type__c.split(';'));
            }
            
            // Find new membership types added
            Set<String> addedMembershipTypes = newMembershipTypes.clone();
            addedMembershipTypes.removeAll(oldMembershipTypes);
            
            // Create opportunities for added membership types
            for (String membershipType : addedMembershipTypes) {
                Opportunity opp = new Opportunity(
                    Name = 'Opportunity for ' + con.LastName + membershipType,
                    ContactId = con.Id,
                    StageName = 'Prospecting', 
                    CloseDate = Date.today().addDays(30), 
                    Opp_Membership_Type__c = membershipType // Set custom picklist value
                );
                opportunitiesToCreate.add(opp);
            }
        }
        
        // Insert new opportunities
        if (!opportunitiesToCreate.isEmpty()) {
            insert opportunitiesToCreate;
        }
    }
}