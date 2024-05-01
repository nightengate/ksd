$(document).ready(function(){
    // Load books from localStorage on page load
    loadBooks();

    // Add Book
    $("#add").click(function(){
        let bookName = $("#bookName").val(),
            authorName = $("#authorName").val(),
            publisherName = $("#publisherName").val(),
            numberPage = $("#numberPage").val(),
            serialNumber = $("#serialNumber").val();

        if (bookName && authorName && publisherName && numberPage && serialNumber) {
            let newRow = $("<tr>");
            newRow.append(`<td>${bookName}</td>`);
            newRow.append(`<td>${authorName}</td>`);
            newRow.append(`<td>${publisherName}</td>`);
            newRow.append(`<td>${numberPage}</td>`);
            newRow.append(`<td>${serialNumber}</td>`);
            newRow.append(`<td><button class="remove">Remove</button></td>`);

            $("tbody").append(newRow);

            // Save to localStorage
            saveBook(bookName, authorName, publisherName, numberPage, serialNumber);

            // Clear input fields
            $("input").val("");
        } else {
            alert("Please fill in all fields!");
        }
    });

    // Remove Book
    $("tbody").on("click", ".remove", function() {
        $(this).closest("tr").remove();

        // Remove from localStorage
        removeBook($(this).closest("tr").index());
    });

    // Save book to localStorage
    function saveBook(bookName, authorName, publisherName, numberPage, serialNumber) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.push({ bookName, authorName, publisherName, numberPage, serialNumber });
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Remove book from localStorage
    function removeBook(index) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Load books from localStorage
    function loadBooks() {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.forEach(function(book) {
            let newRow = $("<tr>");
            newRow.append(`<td>${book.bookName}</td>`);
            newRow.append(`<td>${book.authorName}</td>`);
            newRow.append(`<td>${book.publisherName}</td>`);
            newRow.append(`<td>${book.numberPage}</td>`);
            newRow.append(`<td>${book.serialNumber}</td>`);
            newRow.append(`<td><button class="remove">Remove</button></td>`);
            $("tbody").append(newRow);
        });
    }
});
