public class TestImage {
 
    // Method to fetch ContentDocument records with PNG file type for a given ContactId
     @AuraEnabled(cacheable=true)
    public static List<ContentDocument> getPngFilesForContact(Id contactId) {
        // List to hold the ContentDocument records
        List<ContentDocument> pngFiles = new List<ContentDocument>();

        // Query to get ContentDocumentLink records for the given contactId
        List<ContentDocumentLink> contentDocumentLinks = [
            SELECT ContentDocument.Title, LinkedEntityId, ContentDocumentId 
            FROM ContentDocumentLink 
            WHERE LinkedEntityId = :contactId
        ];

        // Set to hold the unique ContentDocumentIds
        Set<Id> contentDocumentIds = new Set<Id>();

        // Populate the set with ContentDocumentIds from the query result
        for (ContentDocumentLink link : contentDocumentLinks) {
            contentDocumentIds.add(link.ContentDocumentId);
        }

        // Query to get ContentDocument records with PNG file type
        if (!contentDocumentIds.isEmpty()) {
            pngFiles = [
                SELECT Id, Title, FileType 
                FROM ContentDocument 
                WHERE Id IN :contentDocumentIds AND FileType IN ('JPG', 'PNG', 'JPEG') 
            ];
            System.debug('pngFiles'+pngFiles);
        }

        // Return the list of ContentDocument records
        return pngFiles;
    }
}