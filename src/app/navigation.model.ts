export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'administration',
                'title'   : 'Administration',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'party information',
                        'title': 'Party Information',
                        'type' : 'item',
                        'icon' : 'star',
                        'url'  : '/sample',
                    }// ,
                    // {
                    //     'id'   : 'another sample',
                    //     'title': 'Another Sample',
                    //     'type' : 'item',
                    //     'icon' : 'star',
                    //     'url'  : '/another-sample',
                    // }
                ]
            },
            
            {
                'id'      : 'user-management',
                'title'   : 'User Management',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'user management',
                        'title': 'User Management',
                        'type' : 'item',
                        'icon' : 'star',
                        'url'  : '/user-management',
                    }
                ]
            }
        ];
    }
}
