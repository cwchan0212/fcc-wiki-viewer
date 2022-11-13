import "./App.css";
import React from "react";
import Parser from "html-react-parser";

function App() {
    const [search, setSearch] = React.useState("");
    const [results, setResults] = React.useState({});
    // const useRfef = React.useRef(0);

    const fetchData = async (query) => {
        const base = "https://en.wikipedia.org/w/api.php";

        const params = new URLSearchParams({
            action: "query",
            format: "json",
            list: "search",
            origin: "*",
            utf8: 1,
            srlimit: 10,
            srsearch: query,
        });
        // console.log(encodeURI(base + "?" + params.toString()));
        const uri = encodeURI(base + "?" + params.toString());
        const res = await fetch(uri);

        if (res.ok) {
            // console.log(res.ok);
            const data = await res.json();
            setResults(data.query.search);
        }
    };

    const searchIt = () => {
        if (search !== "") {
            fetchData(search);
        }
    };

    const handleKeyDown = (e) => {
        // alert(e.key);
        if (e.key === "Enter") {
            // console.log("search:", search);
            fetchData(search);
        }
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
        // console.log(search);
    };

    const handleRandom = () => {
        window.open("https://en.wikipedia.org/wiki/Special:Random");
        return false;
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        // return num;
    };

    const Results = () => {
        if (Object.keys(results).length > 0) {
            return (
                <div class="searchResult">
                    {/* {JSON.stringify(results)} */}
                    <br />
                    <br />
                    {/* https://en.wikipedia.org/?curid=213219 */}
                    <div class="tableFixHead">
                        <table>
                            <tbody>
                                <thead>
                                    <tr class="th">
                                        <th>:: SEARCH RESULTS::</th>
                                    </tr>
                                </thead>

                                {results.map((result, index) => {
                                    return Parser(
                                        `<tr>
                                    <td>
                                        <a class="title" href=https://en.wikipedia.org/?curid=${
                                            result.pageid
                                        } target=_blank>${
                                            result.title
                                        }</a> <p class=datetime>${new Date(
                                            result.timestamp
                                        )}</p>
                                
                                    <a class="snippet" href=https://en.wikipedia.org/?curid=${
                                        result.pageid
                                    } target=_blank>${result.snippet}...</a>

                                    <span class=other>[Size: ${formatNumber(
                                        result.size
                                    )} / Words: ${formatNumber(
                                            result.wordcount
                                        )}]</span>
                                    </td>
                                </tr>
                                
                                `
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    };

    const Search = () => {
        return (
            <div class="searchBar">
                {/* <form > */}
                <div class="input-group mb-3">
                    <input
                        name="text"
                        autoFocus="autofocus"
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="..."
                        onChange={handleChange}
                        value={search}
                        onKeyDown={handleKeyDown}
                    />
                    <div class="input-group-append">
                        <button
                            name="search"
                            class="btn btn-outline-primary btn-sm"
                            type="button"
                            onClick={searchIt}
                        >
                            <i class="fa-solid fa-magnifying-glass"></i> Search
                        </button>
                    </div>
                    <div class="input-group-append">
                        <button
                            name="lucky"
                            class="btn btn-outline-danger btn-sm"
                            type="button"
                            onClick={handleRandom}
                        >
                            <i class="fa-solid fa-clover"></i> Lucky
                        </button>
                    </div>
                </div>
                {/* </form> */}
            </div>
        );
    };

    return (
        <div className="App">
            <div className="banner">
                <img
                    className="logo"
                    src="https://design-style-guide.freecodecamp.org/downloads/fcc_secondary_small.svg"
                    alt="freeCodeCamp"
                    loading="lazy"
                />{" "}
                =&gt; Build a Wikipedia Viewer
            </div>
            <Search />
            <Results />
        </div>
    );
}

export default App;
