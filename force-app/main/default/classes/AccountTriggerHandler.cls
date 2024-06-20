public class AccountTriggerHandler { 
    public static void handleAfterInsert(List<Account> newAccounts){
        List<Opportunity> opportunitiesToCreate = new List<Opportunity>();
        
        // Map to store membership types and their corresponding Opportunities
        Map<String, List<Opportunity>> membershipTypeOppMap = new Map<String, List<Opportunity>>();
        
        for (Account acc : newAccounts) {
            // Check if Account has selected membership types
            if (acc.Membership_Type__c != null && !String.isEmpty(acc.Membership_Type__c)) { 
                for (String membershipType : acc.Membership_Type__c.split(';')) {
                    // Create an Opportunity for each selected membership type
                    Opportunity opp = new Opportunity(
                        Name = 'Opportunity for ' + acc.Name + membershipType,
                        AccountId = acc.Id,
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
    public static void handleAfterUpdate(Map<Id, Account> oldMap, List<Account> updatedAccounts) {
    List<Opportunity> opportunitiesToCreate = new List<Opportunity>();
    
    // Iterate through updated accounts
    for (Account acc : updatedAccounts) {
        Account oldAcc = oldMap.get(acc.Id);
        Set<String> oldMembershipTypes = new Set<String>();
        Set<String> newMembershipTypes = new Set<String>();
        
        // Extract old and new membership types
        if (oldAcc.Membership_Type__c != null) {
            oldMembershipTypes.addAll(oldAcc.Membership_Type__c.split(';'));
        }
        if (acc.Membership_Type__c != null) {
            newMembershipTypes.addAll(acc.Membership_Type__c.split(';'));
        }
        
        // Find new membership types added
        Set<String> addedMembershipTypes = newMembershipTypes.clone();
        addedMembershipTypes.removeAll(oldMembershipTypes);
        
        // Create opportunities for added membership types
        for (String membershipType : addedMembershipTypes) {
            Opportunity opp = new Opportunity(
                Name = 'Opportunity for ' + membershipType,
                AccountId = acc.Id,
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