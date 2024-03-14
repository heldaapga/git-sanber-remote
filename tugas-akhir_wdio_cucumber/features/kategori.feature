Feature: Add category item

    Background: 
        Given the user is on login page

    Scenario: User can add category
        When I input my email as "heldaapga@gmail.com" and my pass as "helda123"
        And I click button login
        And I redirect to the dashboard page 
        And I click button named kategori
        And I click button tambah 
        And I input name as "<nama>" and deskripsi "<deskripsi>"
        And I click button simpan
        Then I must see successfull message "<message>"

        Examples:
            | nama     | deskripsi         | message          |
            | premium  | kualitas produk   | item ditambahkan |