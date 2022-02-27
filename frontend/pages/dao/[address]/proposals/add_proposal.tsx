import { Layout } from '@/components/common';
import { AddProposalFormData } from '@/types/Proposal';
import { useState } from 'react';
import { registerProposal } from 'contracts/SubDAO';
import { FormInputText } from '@/components/ui';

const AddProposal = () => {
	const [proposalId, setPoposalId] = useState("")
	const [formValue, setFormValue] = useState<AddProposalFormData>({
		subDaoAddress: "",
		proposalKind: 0,
		title: "",
		outline: "",
		detail: "",
		githubURL: ""
	})

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,
			[event.target.name]: event.target.value
		})
	}

	const onSubmitAddProposalForm = async (event: React.FormEvent<HTMLFormElement>) => {
		console.log("#### Submit 1")
		event.preventDefault()
		const proposalId = await registerProposal(formValue.subDaoAddress, formValue)
		if (proposalId !== "") {
			setPoposalId(proposalId)
		}
	}

	return (
		<>
			<div>
				<h1 className="text-3xl">Add A Proposal</h1>
				<div className="p-5"></div>
				<form
					className="w-full max-w-screen-sm"
					onSubmit={onSubmitAddProposalForm}
				>
					<FormInputText
						label='Sub DAO Address'
						className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
			    leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						name="subDaoAddress"
						handleOnChangeInput={onChangeInput}
					/>
					<FormInputText
						label='Proposal Kind'
						className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
			    leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						name="proposalKind"
						handleOnChangeInput={onChangeInput}
					/>
					<FormInputText
						label='Title'
						className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
			  	leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						name="title"
						handleOnChangeInput={onChangeInput}
					/>
					<FormInputText
						label='Outline'
						className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
			    leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						name="outline"
						handleOnChangeInput={onChangeInput}
					/>
					<FormInputText
						label='Detail'
						className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
			    leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						name="detail"
						handleOnChangeInput={onChangeInput}
					/>
					<FormInputText
						label='Github URL'
						className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
			    leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						name="githubURL"
						handleOnChangeInput={onChangeInput}
					/>
					<div className="p-5">
						<div className="md:w-1/3"></div>
						<div className="md:w-2/3">
							<button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
				font-bold py-2 px-4 rounded" type="submit">
								Add a Proposal
							</button>
						</div>
					</div>
					<p className="text-sm p-5">
						Your Proposal Accept With The Proposal ID : [ {proposalId} ]
					</p>
				</form>
			</div>
		</>
	);
}

AddProposal.Layout = Layout
export default AddProposal
