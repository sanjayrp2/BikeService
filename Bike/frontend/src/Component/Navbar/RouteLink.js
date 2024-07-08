const admin =[
    {link:'/allservices' ,name:'service'},
    {link:'/addservices',name:'addservice'},
    {link:'/seeallbookings',name:'allbooking'}
]
const user=[
    {link:'/addbooking',name:'addbooking'},
    {link:'/allbooking',name:'allbooking'},
    {link:'/history',name:'bookinghistory'},
    {link:'/allservices' ,name:'service'},
    {link:'/login',name:'logout'}
]

const RouteLink = {admin,user};
export default RouteLink;