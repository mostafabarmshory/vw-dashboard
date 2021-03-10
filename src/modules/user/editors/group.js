/*
 * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import templateUrl from './group.html';
import Constants from '../Constants';
import QueryParameter from '../../core/QueryParameter';

const graphQl = `{
	id,title,description,
	roles{id, name, code_name, application, description}
}`;
/**
@ngdoc Editor
@name AmdGroupCtrl
@property {boolean} groupLoading  Is true if controller is working on group.
@property {boolean} roleLoading   Is true if controller is working on roles.
@property {boolean} userLoading   Is true if controller is working on users.
@description Controller of a group

Manages a group view
 */
export default {
	templateUrl: templateUrl,
	protect: true,
	controller: function($scope, $element, $usr, $state, $controller, $editor, UserGroup, $mbQueue) {
		'ngInject';

		angular.extend(this, $controller('MbSeenAbstractItemEditorCtrl', {
			$scope: $scope,
			$element: $element,
			$editor: $editor
		}));

		this.findRole = (query) => {
			var queryParameter = new QueryParameter();
			queryParameter.setQuery(query);
			return $usr.getRoles(queryParameter)
				.then(list =>{
					return list.items;
				});
		};

		this.updateGroup = ($event) => {
			return $mbQueue.all([
				this.execOnModel(SEEN_MODEL_UPDATE_ACTION, $event),
				this.execOnModel(AMD_USER_GROUP_UPDATE_ROLES_ACTION, $event),
			])
			.then(() => this.setDerty(false));
		};
	
		$usr
			.getGroup($state.params.modelId, {
//				graphQl: graphQl
			})//
			.then(groupData => {
				var group = new UserGroup(groupData);
				group.getRoles()
					.then((roles) => {
						group.roles = roles.items;
						group.$roles = _.cloneDeep(roles.items);
					});
				this
					.setModel(group)
					.setStorePath(Constants.AMD_USER_GROUPS_SP);
				$editor.setTitle('Group:' + group.id);
			});
	}
}


