export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'administration',
                'title'   : 'User Management',
                'type'    : 'group',
                'children': [
                                {
                                    'id'        : 'users',
                                    'title'     : 'Users',
                                    'type'      : 'item',
                                    'icon'    : 'person',
                                    'url'       : '/user-management/users',
                                    'exactMatch': true
                                },
                            ]
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
