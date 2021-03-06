import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Screen from "../Screen/Screen";
import TabBar from "../organizations/TabBar/TabBar";
import BookCard from "../BookCard/BookCard";
import Book from "../../model/book";
import AppContext from "../../contexts/AppContexts";

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;
type MyBookShellTabState = "available" | "lending";
type MyBookFilterState = "all" | "borrowing";
const initState = "available";

const MyBookList = () => {
  const { state } = useContext(AppContext);

  const [mybooks, setMyBooks] = useState<Book[]>([]);
  const [showBooks, setShowBooks] = useState<Book[]>([]);
  const [filterType, setFilterType] = useState<MyBookFilterState>("all");
  const [isLoading, setIsLoading] = useState(true);

  const fetch = async () => {
    await axios.get(ENTRY_POINT + `/books?user_id=${state.user.id}`).then((res) => {
      const books: Book[] = res.data.map((data: any) => Book.fromJson(data));
      setMyBooks(books);
      if (initState === "available") {
        setShowBooks(books);
      } else {
        setShowBooks(books.filter(({ status }) => status === "lending"));
      }
      setIsLoading(false);
    });
  }

  useEffect(() => {
    fetch();
  }, [state.user.id]);

  const handleTabChange = (tabState: MyBookShellTabState) => {
    if (tabState === "available") {
      setShowBooks(mybooks.filter(({status}) => status === "having" || status === "borrowing"));
    } else {
      setShowBooks(mybooks.filter(({ status }) => status === "lending"));
    }
  };

  const handleFilterChange = (type: MyBookFilterState) => {
    setFilterType(type);
  };

  useEffect(() => {
    if (filterType === "all") {
      setShowBooks(mybooks);
    } else {
      setShowBooks(mybooks.filter((book) => book.status === "borrowing"));
    }
  }, [filterType, mybooks]);

  return (
    <Screen>
      <TabBar initState={initState} onTabChange={handleTabChange} />
      <div className="mybooklist-body">
        <div className="mybooklist-select-outer">
          <select
            value={filterType}
            onChange={(e) =>
              handleFilterChange(e.target.value as MyBookFilterState)
            }
          >
            <option value="all">今読める本全て</option>
            <option value="borrowing">借りている本</option>
          </select>
        </div>
        {showBooks.length === 0
          ? !isLoading && (
              <div className="empty-message">対象の本はありません</div>
            )
          : showBooks.map((mybook) => (
              <BookCard key={mybook.id} book={mybook}/>
            ))}
      </div>
    </Screen>
  );
};

export default MyBookList;
