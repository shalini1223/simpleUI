import axios from 'axios';
import qs from 'qs';
import schedule from 'node-schedule';

export async function createCustomerInQuickBooks(data) {
    try{
        const payload = {
            FullyQualifiedName : `${data.firstName}${data.lastName}`,
            PrimaryEmailAddr: {
                Address: data.email
            },
            DisplayName:  `${data.firstName}${data.lastName}`,
            PrimaryPhone: {
                FreeFormNmuber: data.phone
            },
            BillAddr:{
                CountrySubDivisionCode: 'MO',
                City: 'Joplin',
                PostalCode: '64801',
                Line1:' 3560 Tator Patch Road',
                Country: 'USA'
            },
            ShipAddr:{
                CountrySubDivisionCode: 'MO',
                City: 'Joplin',
                PostalCode: '64801',
                Line1:' 3560 Tator Patch Road',
                Country: 'USA'
            },
            GivenName: data.firstName
        };
        const token = await DataService.findOne(Token,{});
            const response = await axios.post(`${createCustomerApi}`, payload,{
                headers:{
'Content-Type': 'application/json',
Accept: 'application/json',
Authorization:  `Bearer ${token.accessTokens}`
                }
            });
            return response.data;
    
    }catch(err){
        console.log(err);
    }
};

export async function refreshAccessToken(refreshToken, encodeString){
    const response = await axios.post(
        QB_TOKEN_URL,
        qs.stringify({
            grant_type:'refresh_token',
            refresh_token: refreshToken
        }),
        {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${encodedString}`
        }
        }
    );
    return response.data;
}

export function refreshAccessTokenEvryHour (){
    schedule.scheduleJob({rule: '*/30 * * * *'}, async () =>{
        try{
const token = await DataService.findOne(Token,{});
const {refreshToken} = token;
const stringToEncode =`${QB_CLIENT_ID}:${QB_CLIENT_SECRET}`;
const encodeString = Buffer.from(stringToEncode).toString('base64');
const data = await refreshAccessToken(refreshToken, encodeString);
await DataService.updateData(
    Token,
    {_id: utils.convertToObjectId(token._id)},
    {
        accessTokens: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
        xRefreshTokenExpiresIn: data.x_refresh_token_expires_in
    }
);
        }catch(err){
            console.log('err', err);
        }
    })
}