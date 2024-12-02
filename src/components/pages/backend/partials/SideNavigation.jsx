
import { LayoutDashboard, Megaphone } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const SideNavigation = ({menu}) => {
    const links =[
    {
        title : 'Dashboard',
        slug : '/admin/Dashboard',
        icon : <LayoutDashboard size={16}/>,
    },
    { title : 'Question',
        slug : '/admin/Question',
        icon : <Megaphone  size={16}/>,
    },
       
    
]
  return (
    <>
       <aside className='p-4 border-r border-line'>
           <h1>Quiz</h1>
           <nav>
        <ul className='mt-10'>
            {links.map((item,key)=>( <li className={`${menu === item.slug.replaceAll("/admin/","") ?
             " border-accent bg-accent opacity-100 text-white" : "xxxxx"} p-2 mb-2 rounded-md border border-transparent opacity-70 hover:opacity-100`}
            key={key}>
                
                <NavLink to={`${item.slug}`} className="flex gap-2 text-base items-center">
                {item.icon}{item.title}</NavLink></li>
      ))}
           
        </ul>
    </nav>
        </aside> 
    </>
    
  )
}
export default SideNavigation
