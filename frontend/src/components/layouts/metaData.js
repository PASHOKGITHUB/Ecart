import {Helmet} from 'react-helmet-async'

export default function({title}){
    return(
        <Helmet>
            <title>{`${title}-Ecart`}</title>
        </Helmet>
    )
}