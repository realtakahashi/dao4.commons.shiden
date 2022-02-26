import type { InferGetStaticPropsType, NextPage } from 'next'
import { Layout } from '@/components/common'

export const getStaticProps = async () => {
    return { props: {} }
}

const NewIndex = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return(
        <>
            <h1 className="Tiltle text-purple-900 font-extrabold text-6xl"> Welcome to DAO4.Commons.Shiden </h1>
            
            <p className="p-10"></p>
            
            <p className="text-purple-900 text-3xl leading-10">This dApp is for use a DAO for real life time. </p>
            <p className="text-purple-900 text-3xl leading-10">You don't have to treat DAO as something special. </p>
            <p className="text-purple-900 text-3xl leading-10">"I want to clean the area where I live", </p>
            <p className="text-purple-900 text-3xl leading-10">"I want to create a place where children can play",</p> 
            <p className="text-purple-900 text-3xl leading-10">"I want to increase the related population in the area where I live", </p>
            <p className="text-purple-900 text-3xl leading-10">"I want to take action against global warming", etc. </p>
            <p className="text-purple-900 text-3xl leading-10">You no longer have to worry that you want to start something on your own,</p>
            <p className="text-purple-900 text-3xl leading-10">but you don't have a team, you don't have the infrastructure to build and work with.</p>
        
            <p className="p-10"></p>
            <p className="text-purple-900 text-4xl font-extrabold leading-10">Let's Start your Activities With DAO. </p>
            
            <p className="p-10"></p>
            <p className="text-purple-900 text-4xl font-bold leading-10">How to Create DAO </p>                        
            <p className="p-2"></p>
            <p className="text-purple-900 text-2xl leading-10">1. Create a Sub DAO.</p>
            <p className="text-purple-900 text-2xl leading-10">2. Deploy a NFT for as proof of DAO member.</p>
            <p className="text-purple-900 text-1xl leading-10"># To become a member of DAO, you need to deposit a certain amount and Mint this NFT.</p>
            <p className="text-purple-900 text-1xl leading-3"># When you create a DAO, it will be added to the Master DAO as a Sub DAO.</p>

            <p className="p-10"></p>
            <p className="text-purple-900 text-4xl font-bold leading-10">How to be DAO Member </p>                        
            <p className="p-2"></p>
            <p className="text-purple-900 text-2xl leading-10">1. You will need to contact the DAO owner or DAO member for approval.</p>
            <p className="text-purple-900 text-2xl leading-10">2. Ask the DAO owner or DAO member for the NFT address for the member and mint it.</p>
            <p className="text-purple-900 text-2xl leading-10">3. Contact the DAO member with the TokenId and ask them to add the member.</p>

            <p className="p-10"></p>
            <p className="text-purple-900 text-4xl font-bold leading-10">How to submit a Proposal </p>                        
            <p className="p-2"></p>
            <p className="text-purple-900 text-2xl leading-10">........</p>

            <p className="p-10"></p>
            <p className="text-purple-900 text-4xl font-bold leading-10">How to vote a Proposal </p>                        
            <p className="p-2"></p>
            <p className="text-purple-900 text-2xl leading-10">........</p>

            <p className="p-10"></p>
            <p className="text-purple-900 text-4xl font-bold leading-10">How to create a token sale </p>                        
            <p className="p-2"></p>
            <p className="text-purple-900 text-2xl leading-10">........</p>

            <p className="p-10"></p>
            <p className="text-purple-900 text-4xl font-bold leading-10">How to get a basic income as a DAO </p>                        
            <p className="p-2"></p>
            <p className="text-purple-900 text-2xl leading-10">........</p>

            <p className="p-10"></p>
            <p className="text-purple-900 text-4xl font-bold leading-10">How to relate other DAO </p>                        
            <p className="p-2"></p>
            <p className="text-purple-900 text-2xl leading-10">........</p>

            <p className="p-7"></p>
            <a href="/" className="text-purple-900 text-5xl font-extrabold leading-10 underline">→→→→ Starting to Create Sub DAO →→→→ </a>

        </>
    )
}

NewIndex.Layout = Layout
export default NewIndex