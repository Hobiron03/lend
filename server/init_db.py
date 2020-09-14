from models.config import engine

from models.book import Base_book
from models.own_book import Base_own_book
from models.user import Base_user
from models.lend_info import Base_lend_info

Base_book.metadata.create_all(engine)

Base_own_book.metadata.create_all(engine)

Base_user.metadata.create_all(engine)

Base_lend_info.metadata.create_all(engine)

