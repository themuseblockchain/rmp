export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            // {
            //     'id'      : 'administration',
            //     'title'   : 'User Management',
            //     'type'    : 'group',
            //     'children': [
            //                     {
            //                         'id'        : 'users',
            //                         'title'     : 'Users',
            //                         'type'      : 'item',
            //                         'icon'    : 'person',
            //                         'url'       : '/user-management/users'
            //                     },
            //                 ]
            // },
            {
                'id'      : 'rights-management',
                'title'   : 'Rights Management Portal',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'post content',
                        'title': 'Post Content',
                        'type' : 'item',
                        'icon' : 'star',
                        'url'  : './post'
                    }
                ]
            },
        ];
    }
}
