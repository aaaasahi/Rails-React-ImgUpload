class BooksController < ApplicationController
  def index
    def index
      @books = Book.all
      render json: @books
  end
  end
  
  def create
    @book = Book.new(books_params)
    if @book.save
      render json: { status: 200, book: @book }
    else
      render json: { status: 500 }
    end
  end

  def show
    @book = Book.find(params[:id])
    if @book
      render json: { status: 200, book: @book }
    else
      render json: { status: 500}
    end
  end

  private

    def books_params
      params.require(:book).permit(:file)
    end
end
