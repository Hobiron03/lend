from models.config import engine

from models.book import Base_book
from models.own_book import Base_own_book

Base_book.metadata.create_all(engine)

Base_own_book.metadata.create_all(engine)
