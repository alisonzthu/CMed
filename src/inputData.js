//this is our 3 udi strings. The second one needs percent-encoding to parse '+' to '%2B' to let the API consider it as a valid string
const qstrings = [
    {'agency': 'GS1 Issuing Agency', 
     'udi': '(01)10884521062856(11)141231(17)150707(10)A213B1(21)1234'}, 
    {'agency': 'HIBCC',
     'udi': '%2BB066000325011NS1/%24%24420020216LOT123456789012345/SXYZ456789012345678/16D20130202C1'}, 
    {'agency': 'ICCBBA',
     'udi': '=/W4146EB0010T0475=,000025=A99971312345600=>014032=}013032&,1000000000000XYZ123'}];
export default qstrings;
