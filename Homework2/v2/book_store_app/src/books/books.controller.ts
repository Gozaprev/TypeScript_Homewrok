import { Controller, Res, Get, Post, Put, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { Response } from "express";

interface BookReqBody {
    id: number,
    title: string,
    author: string,
    price: number

};

interface UpdateBookBody {
    //id?: number,
    title?: string,
    author?: string,
    price?: number
}


@Controller('api/books')
export class BooksController {
    private books = [
        { id: 1, title: 'NestJS Basics', author: 'John Doe', price: 29.99 },
        { id: 2, title: 'Advanced Node', author: 'Jane Smith', price: 39.99 },
        { id: 3, title: 'TypeScript Basics', author: 'John Doe', price: 29.99 },
        { id: 4, title: 'Advanced TypeScript', author: 'Jane Smith', price: 39.99 },
        { id: 5, title: 'JavaScript Basics', author: 'John Doe', price: 29.99 },
        { id: 6, title: 'Advanced JavaScript', author: 'Jane Smith', price: 39.99 },
        { id: 7, title: 'HTML Basics', author: 'John Doe', price: 29.99 },
        { id: 8, title: 'Advanced HTML', author: 'Jane Smith', price: 39.99 },
        { id: 9, title: 'CSS Basics to advanced', author: 'John Doe', price: 29.99 },
        { id: 10, title: 'Advanced Node', author: 'Jane Smith', price: 39.99 }
    ];


    @Get()
    findAll() {
        return this.books;
    }

    @Get('search')
    search(
        @Query('minPrice') minPrice?: string,
        @Query('author') author?: string
    ) {

        let result = [...this.books];

        // if (author) {
        //     result = result.filter(book => book.author.toLowerCase() === author.toLowerCase());

        // }

        // if (author) {
        //     result = result.filter(
        //         book => book.author.toLowerCase().includes(author.toLowerCase())
        //       );

        // }


        // if (author) {
        //     const authorLower = author.toLowerCase();
        //     result = result.filter(book => book.author.toLowerCase() === authorLower);

        //   }

        if (author) {
            const authorLower = author.toLowerCase();
            result = result.filter(book => book.author.toLowerCase().includes(authorLower));
        }




        if (minPrice) {
            result = result.filter((books) => books.price >= parseFloat(minPrice))
        }

        return result

        // if (author) {
        //     result = result.filter((books) => books.author === author)
        // }


    }


    // experiemntal solution:

    // findAll(@Query() filters: { minPrice?: string, author?: string }) {
    //     let result = this.books;

    //     if (filters.minPrice) {
    //         result = result.filter(book => book.price >= parseFloat(filters.minPrice));
    //     }

    //     if (filters.author) {
    //         result = result.filter(book => book.author === filters.author);
    //     }

    //     return result;
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     const book = this.books.find(b => b.id === parseInt(id));
    //     return book || { statusCode: HttpStatus.NOT_FOUND, message: 'Book not found' };
    // }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() response: Response) {
        const book = this.books.find((b) => b.id === parseInt(id));

        if (!book) {
            // Once we use the native response object we must return values using it in the method
            return response.status(404).send({ message: `Book with id: ${id} not found.` })
        };

        return response.send(book);
    }



    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() requestBody: BookReqBody) {
        const book = {
            id: this.books.length + 1,
            title: requestBody.title,
            author: requestBody.author,
            price: requestBody.price
        };
        this.books.push(book);
        return book;
    }



    // @Put(':id')
    // update(@Param('id') id: string, @Body() updatedBook: any) {
    //     const index = this.books.findIndex(b => b.id === parseInt(id));
    //     if (index === -1)
    //         return { statusCode: HttpStatus.NOT_FOUND, message: 'Book not found' };

    //     this.books[index] = { ...this.books[index], ...updatedBook };
    //     return this.books[index];
    // }

    @Put(':id')
    update(@Param('id') id: string, @Body() requestBody: UpdateBookBody, @Res() response: Response) {
        const bookIndex = this.books.findIndex((book) => book.id === +id);
        // findIndex returns -1 if the value is not found
        if (bookIndex === -1) {
            return response.status(404).send({ message: "Book not found" })
        }

        const book = this.books[bookIndex];

        const updatedBook = {
            id: book.id,
            title: requestBody.title || book.title,
            author: requestBody.author || book.author,
            price: requestBody.price || book.price
        };

        this.books[bookIndex] = updatedBook;

        return response.send(updatedBook)

    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        this.books = this.books.filter(b => b.id !== parseInt(id));
        return {
            message: `Book with id: ${id} removed.`
        }
    }

    //solution plus:

    /*
    @Delete(':id')
    remove(@Param('id') id: string){
        const filteredBooks = this.books.filter((book) => book.id !== parseInt(id));

        this.books = filteredBooks;

        return {
            message: `Book with id: ${id} removed.`
        }
    }

    */

}
