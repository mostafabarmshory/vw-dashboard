//
import templateUrl from './download-links.html';
export default {
	access: 'hasAnyRole("tenant.owner")',
	controller: 'SdpDownloadedFilesLinkCtrl',
	templateUrl: templateUrl,
	title: 'Downloaded links',
	icon: 'cloud_download',
	groups: ['Digital Assets'],
}


