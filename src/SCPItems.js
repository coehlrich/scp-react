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
                <h2>Item #: {name}</h2>

                <Image enabled={data.image != null} image={data.image} alt={name} />

                {data.sections.map(
                    (section) => {
                        return(
                            <div key={section.name}>
                                <h3>{section.name}:</h3>
                                {section.content.map(
                                    (paragraph) => {
                                        return(
                                            <p key={paragraph.id}>
                                                <ParseFormattedText formattedText={paragraph}/>
                                            </p>
                                        );
                                    }
                                )}
                            </div>
                        );
                    }
                )}
            </div>
        );
    }
)

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
            return formattedText.content.map(
                (subformattedText) => {
                    return(
                        <ParseFormattedText key={subformattedText.id} formattedText={subformattedText} />
                    );
                }
            );
        default:
            return formattedText.content;
    }
}

function Image({enabled, image, name}) {
    if (enabled != null) {
        return(
            <img src={image} alt={name}/>
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