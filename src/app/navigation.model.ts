export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'administration',
                'title'   : 'Rights Management Portal',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'party information',
                        'title': 'Party Information',
                        'type' : 'item',
                        'icon' : 'star',
                        'url'  : '/sample',
                    },
                    {
                        'id'   : 'another sample',
                        'title': 'Another Sample',
                        'type' : 'item',
                        'icon' : 'star',
                        'url'  : '/another-sample',
                    }
                ]
            },
            
             {
                'id'        : 'users',
                'title'     : 'Users',
                'type'      : 'item',
                'icon'    : 'person',
                'url'       : '/user-management/users',
                'exactMatch': true
            },

                        {
                'id'      : 'rights-management',
                'title'   : 'Rights Management',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'post content',
                        'title': 'Post Content',
                        'type' : 'item',
                        'icon' : 'star',
                        'url'  : '/rights-management/content',
                        'exactMatch': true
                    }
                ]
            },
        ];
    }
}
