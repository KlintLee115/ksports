"use client"

import RelatedWord from "./RelatedWord"
import { useTransition } from "react";
import Loading from "@/components/Loading";

type WordType = {
    word: string,
    productCount: number
}

export default function RelatedWordsOptions({words}:{words: WordType[]}) {

    const [isPending, startTransition] = useTransition()

    return <div>
        <h3 className="text-2xl  font-semibold mt-4">Shop by related keywords</h3>
        {
            isPending ? <Loading /> :
                <div className="flex flex-wrap gap-x-7 gap-y-5 mb-16 mt-4">
                    {
                        words.map(item => <RelatedWord {...item} key={item.word} startTransition={startTransition} />)
                    }
                </div>
        }
    </div>
}