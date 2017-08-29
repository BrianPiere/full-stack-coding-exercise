import { createSelector } from 'reselect'


export function getSitesArr(state){

	if(!Array.isArray(state.sitesArr))
		throw new Error("Error in selector getSitesArr. The state object should contain an array for state.sitesArr[].")

	return state.sitesArr
}

export function getSiteListDetails(state){

	if(typeof state.sitesListDetails !== "object")
		throw new Error("Error in selector getSiteListDetails. The sitesListDetails should be of type object.")

	return state.sitesListDetails
}

export const getSelectedSiteId = createSelector(
	getSiteListDetails,
	getSiteListDetailsObj => getSiteListDetailsObj.selectedSiteId
)

export const getSitesListIsLoading = createSelector(
	getSiteListDetails,
	getSiteListDetailsObj => getSiteListDetailsObj.sitesListIsLoading
)

export const getSitesListIsLoadingError = createSelector(
	getSiteListDetails,
	getSiteListDetailsObj => getSiteListDetailsObj.sitesListLoadingError
)

export const getSelectedSiteObj = createSelector(
	getSelectedSiteId,
	getSitesArr,
	(selectedSiteId, sitesArr) => {

		let filteredSitesArr = sitesArr.filter(siteObj => siteObj._id === selectedSiteId)

		if(filteredSitesArr.length !== 1)
			return null

		return filteredSitesArr[0]
	}
)

export const getSelectedSiteIsLoading = createSelector(
	getSelectedSiteObj,
	selectedSiteIdObj => {

		if(!selectedSiteIdObj)
			return false

		return selectedSiteIdObj.isLoading ? true : false
	}
)

export const getSelectedSiteIsLoaded = createSelector(
	getSelectedSiteObj,
	selectedSiteIdObj => {

		if(!selectedSiteIdObj)
			return false

		return selectedSiteIdObj.isLoaded ? true : false
	}
)

export const getSelectedSiteHasError = createSelector(
	getSelectedSiteObj,
	selectedSiteIdObj => {

		if(!selectedSiteIdObj)
			return false

		return selectedSiteIdObj.hasErrorLoading ? true : false
	}
)

export const getSelectedSiteFlags = createSelector(
	getSelectedSiteObj,
	selectedSiteIdObj => {

		if(!selectedSiteIdObj || !selectedSiteIdObj.flags)
			return []

		return selectedSiteIdObj.flags
	}
)

export const getSelectedSiteName = createSelector(
	getSelectedSiteObj,
	selectedSiteIdObj => {

		if(!selectedSiteIdObj)
			return "";

		return selectedSiteIdObj.name
	}
)

export const getShowAddFlagFormForSelectedSite = createSelector(
	getSelectedSiteObj,
	selectedSiteIdObj => {

		if(!selectedSiteIdObj)
			return false

		return selectedSiteIdObj.showAddFlagForm ? true : false
	}
)
