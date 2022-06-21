import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

// Firebase
import { db } from "../../lib/firebase/config";
import { collection, getDocs, orderBy } from "firebase/firestore";

import { Accordion } from "react-bootstrap";

// Tabldel.js
import TableComp from "../../components/Table/Index";

// Meta tags
import Meta from "../../components/meta";
// Toastify
import { toast } from "react-toastify";

export default function PhrasalVerb({ PhrasalVerb }) {
    const [DataType, setDataType] = useState("");
    const [filter, setfilter] = useState("");
    const { darkMode } = useSelector((state) => state.config);

    // filter data by search input
    const filteredData = useMemo(() => {
        if (filter === "") PhrasalVerb;

        return PhrasalVerb.filter((item) => {
            return item.en.Name.toLowerCase().includes(filter.toLowerCase());
        });
    }, [filter, PhrasalVerb]);

    const phrasalVerbsNames = [
        ...PhrasalVerb.map((item) => item.en.Name),
        ...PhrasalVerb.map((item) => item.ar.Name),
    ].join(", ");

    return (
        <>
            <Meta
                title="phrasal Verbs | Vocabulary | EnglishStu"
                description="A list of English phrasal Verbs, with definitions, explanations, sample sentences, quizzes and answers. Arranged alphabetically."
                keywords={phrasalVerbsNames}
            />
            <>
                <Accordion defaultActiveKey="0" alwaysOpen>
                    <Accordion.Item
                        className={`${darkMode ? "bg-dark" : ""}`}
                        eventKey="0"
                    >
                        <Accordion.Header
                            style={{ direction: "initial" }}
                            className={`${darkMode ? "dark" : ""}`}
                        >
                            What is the Phrasal verbs?
                        </Accordion.Header>
                        <Accordion.Body>
                            Phrasal verbs are very common in English, especially
                            in more informal contexts. They are made up of a
                            verb and a particle or, sometimes, two particles.
                            The particle often changes the meaning of the verb
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <TableComp
                    Name="Phrasal Verbs"
                    filter={filter}
                    setfilter={setfilter}
                    Data={filteredData}
                    DataType={DataType}
                    setDataType={setDataType}
                />
            </>
        </>
    );
}
// translation ##################################
// fetch data from firebase in getStaticProps
export async function getStaticProps() {
    let PhrasalVerb = [];
    let id = 1;
    // await the promise
    try {
        await getDocs(collection(db, "PhrasalVerb"), orderBy("createdAt")).then(
            (res) => {
                res.forEach(function (doc) {
                    PhrasalVerb.push({
                        id,
                        en: {
                            Name: doc.data().en.Name,
                            Ex: doc.data().en.Ex,
                            Desc: doc.data().en.Desc,
                        },
                        ar: {
                            Name: doc.data().ar.Name,
                            Ex: doc.data().ar.Ex,
                            Desc: doc.data().ar.Desc,
                        },
                    });
                    id += 1;
                });
            }
        );
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }

    return {
        props: {
            PhrasalVerb,
        },
        revalidate: 120,
    };
}
