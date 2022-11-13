# Build a Wikipedia Viewer
**Objective**: Build an app that is functionally similar to this: https://codepen.io/freeCodeCamp/full/wGqEga/.

The MediaWiki software powers Wikipedia, and it helps you collect and organize knowledge and make it available to people.

Using the MediaWiki API, replicate the search function and random article function, similar to the example app above. You can use Wikipedia as your data source.

Fulfill the below user stories and get all of the tests to pass. Use whichever libraries or APIs you need. Give it your own personal style.

**User Story**: I can search Wikipedia entries in a search box and see the resulting Wikipedia entries.

**User Story**: I can click a button to see a random Wikipedia entry.

When you are finished, include a link to your project on CodePen and click the "I've completed this challenge" button.

You can get feedback on your project by sharing it on the [freeCodeCamp forum](https://forum.freecodecamp.org/c/project-feedback/409).

Solution Link: https://bit.ly/3eVSOWl

---

### Folder Structure
```sh
public/
├─ favicon.ico
├─ index.html
src/
├─ App.css
├─ App.js
├─ index.js
package.json
```


# Steps to complete the project
---

## Step 1: Set states of the search and results 

```js
    const [search, setSearch] = React.useState("");
    const [results, setResults] = React.useState({});
```

## Step 2: Create function fetchData to get the wiki api with search param

```js
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
```

## Step 3: Create eventHandler functions to the button click and text field change

```js
    const searchIt = () => {
        if (search !== "") {
            fetchData(search);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            fetchData(search);
        }
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRandom = () => {
        window.open("https://en.wikipedia.org/wiki/Special:Random");
        return false;
    };
```

## Step 4: Create function to format number with comma

```js
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };
``` 

## Step 5: Create results component to display the search result

```js
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
```

## Step 6: Create search component for inputting search param

```js
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
```

## Step 7: Create the layout of the wiki viewer with freeCodeCamp banner

```js
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

```