public with sharing class ImageController {
    @AuraEnabled(cacheable=true)
    public static String getImageFromContact(String recordId) {
        try {
            // Query for ContentDocumentLinks
            List<ContentDocumentLink> docLinks = [
                SELECT ContentDocumentId
                FROM ContentDocumentLink
                WHERE LinkedEntityId = :recordId
                LIMIT 1
            ];

            if (docLinks.isEmpty()) {
                return 'No image found';
            }

            // Get the ContentDocumentId from the first ContentDocumentLink
            String contentDocumentId = docLinks[0].ContentDocumentId;

            // Query for the latest ContentVersion
            List<ContentVersion> contentVersions = [
                SELECT VersionData 
                FROM ContentVersion 
                WHERE ContentDocumentId = :contentDocumentId
                ORDER BY VersionNumber DESC
                LIMIT 1
            ];

            if (contentVersions.isEmpty()) {
                return 'No image found';
            }

            // Get the VersionData from the first ContentVersion
            ContentVersion contentVersion = contentVersions[0];

            return 'data:image/jpeg;base64,' + EncodingUtil.base64Encode(contentVersion.VersionData);
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving image: ' + e.getMessage());
        }
    }
}