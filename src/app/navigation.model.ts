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
                'icon'    : 'shopping_cart',
                'url'       : '/user-management/users',
                'exactMatch': true
            },
        ];
    }
}
