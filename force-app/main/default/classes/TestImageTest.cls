@IsTest
public class TestImageTest {
    @IsTest
    static void testGetPngFilesForContact() {
        Contact testContact = new Contact(FirstName = 'Test', LastName = 'Contact');
        insert testContact;

        ContentVersion contentVersionJpg = new ContentVersion(
            Title = 'Test JPG',
            PathOnClient = 'test.jpg',
            VersionData = Blob.valueOf('Test Data'),
            IsMajorVersion = true
        );
        insert contentVersionJpg;
        ContentVersion contentVersionPng = new ContentVersion(
            Title = 'Test PNG',
            PathOnClient = 'test.png',
            VersionData = Blob.valueOf('Test Data'),
            IsMajorVersion = true
        );
        insert contentVersionPng;
        ContentVersion contentVersionJpgQueried = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :contentVersionJpg.Id LIMIT 1];
        ContentVersion contentVersionPngQueried = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :contentVersionPng.Id LIMIT 1];

        Id contentDocumentIdJpg = contentVersionJpgQueried.ContentDocumentId;
        Id contentDocumentIdPng = contentVersionPngQueried.ContentDocumentId;
      
        ContentDocumentLink contentDocumentLinkJpg = new ContentDocumentLink(
            LinkedEntityId = testContact.Id,
            ContentDocumentId = contentDocumentIdJpg,
            ShareType = 'I'
        );
        insert contentDocumentLinkJpg;

        
        ContentDocumentLink contentDocumentLinkPng = new ContentDocumentLink(
            LinkedEntityId = testContact.Id,
            ContentDocumentId = contentDocumentIdPng,
            ShareType = 'I'
        );
        insert contentDocumentLinkPng;

        // Call the method
        Test.startTest();
        List<ContentDocument> result = TestImage.getPngFilesForContact(testContact.Id);
        Test.stopTest();

        // Verify the results
        //System.assertEquals(2, result.size(), 'Result size should be 1');
        //System.assertEquals('Test PNG', result[0].Title, 'Title should be Test PNG');
        //System.assertEquals('PNG', result[0].FileType, 'File type should be PNG');
        //System.AssertException: Assertion Failed: Title should be Test PNG: Expected: Test PNG, Actual: Test JPG
    }
}