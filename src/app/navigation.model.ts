// import { AuthGuard } from './auth/guards/auth.guard';

export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'wallet',
                'title'   : 'Muser Wallet',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'wallet',
                        'title': 'Wallet',
                        'type' : 'item',
                        'icon' : 'star',
                        'url'  : './wallet'
                    },
                ]
            },
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
