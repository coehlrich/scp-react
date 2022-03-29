import { useMatch } from "react-router";
import { Link } from "react-router-dom";
import JSON from "./json/items.json";

const Data = JSON.map(
    (data) => {
        const name = "SCP-" + data.scpNumber.toLocaleString(navigator.language, {
            minimumIntegerDigits: 3
        });
        return(
            <div key={data.scpNumber}>
                <h1>Item #: {name}</h1>
                <br />
                <h2>Object Class: {data.class}</h2>
                <br />

                <Image enabled={data.image != null} image={data.image} name={name} />

                <div className="accordion">
                    {data.sections.map(
                        (section) => {
                            return(
                                <div key={section.id} className="accordion-item">
                                    <h3 className="accordion-header" id={"heading" + section.id}>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + section.id} aria-expanded="true" aria-controls={"collapse" + section.id}>
                                            {section.name}
                                        </button>
                                    </h3>
                                    <div id={"collapse" + section.id} className="accordion-collapse collapse" aria-labelledby={"heading" + section.id}>
                                        <div className="accordion-body">
                                            {section.content.map(
                                                (paragraph) => <ParseRoot key={paragraph.id} formattedText={paragraph} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        );
    }
)

function ParseList({formattedText, formatApply}) {
    return formattedText.content.map(
        (subformattedText) => {
            return formatApply(
                <ParseFormattedText key={subformattedText.id} formattedText={subformattedText} />
            , subformattedText.id);
        }
    );
}

function ParseFormattedText({formattedText}) {
    if (typeof formattedText === "string") {
        return formattedText;
    }
    switch (formattedText.type) {
        case "code":
            return(
                <code>
                    <ParseFormattedText formattedText={formattedText.content} />
                </code>
            );
        case "image":
            return(
                <img src={formattedText.name} alt={formattedText.alt}/>
            )
        case "bold":
            return(
                <b>
                    <ParseFormattedText formattedText={formattedText.content} />
                </b>
            )
        case "list":
            return(
                <ParseList formattedText={formattedText} formatApply={(subFormattedText, id) => subFormattedText} />
            );
        default:
            return formattedText.content;
    }
}

function ParseRoot({formattedText}) {
    switch (formattedText.type) {
        case "ordered":
            return(
                <ol>
                    <ParseList formattedText={formattedText} formatApply={(subFormattedText, id) => 
                        <li key={id}>
                            {subFormattedText}
                        </li>
                    } />
                </ol>
            );
        default:
            return(
                <p>
                    <ParseFormattedText formattedText={formattedText} />
                </p>
            )
    }
}

function Image({enabled, image, name}) {
    if (enabled) {
        return(
            <img src={image} alt={name} className="img-fluid"/>
        )
    } else {
        return null;
    }
}

function Page(args) {
    return(
        <li className={"page-item" + (!args.enabled ? " disabled" : "")}>
            <Link className="page-link" to={args.url} tabIndex={args.enabled ? 0 : -1} aria-disabled={!args.enabled ? "true" : "false"}>{args.children}</Link>
        </li>
    )
}

function SCPItems() {
    let number = parseInt(useMatch("/scp-items/:item").params.item);
    let index = JSON.findIndex(
        (item) => {
            return item.scpNumber === number;
        }
    );

    let item = null;
    if (index !== -1) {
        item = Data[index];
    }

    const previous = index > 0;
    const next = index < JSON.length - 1 && index !== -1;

    const Pages = JSON.map(
        (item) => {
            return(
                <Page url={"/scp-items/" + item.scpNumber} enabled={item.scpNumber !== number} key={item.scpNumber}>
                    {item.scpNumber}
                </Page>
            );
        }
    )
    return(
        <div>
            {item}
            <br />
            <nav area-label="items">
                <ul className="pagination">
                    <Page url={"/scp-items/" + (previous ? JSON[index - 1].scpNumber : "")} enabled={previous}>
                        Previous
                    </Page>
                    {Pages}
                    <Page url={"/scp-items/" + (next ? JSON[index + 1].scpNumber : "")} enabled={next}>
                        Next
                    </Page>
                </ul>
            </nav>
        </div>
    )
}

export default SCPItems;