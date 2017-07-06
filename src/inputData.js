//this is our 3 udi strings. The second one needs percent-encoding to parse '+' to '%2B' to let the API consider it as a valid string
const initialStrings = [
    '(01)10884521062856(11)141231(17)150707(10)A213B1(21)1234', 
    '+B066000325011NS1/$$420020216LOT123456789012345/SXYZ456789012345678/16D20130202C1', 
    '=/W4146EB0010T0475=,000025=A99971312345600=>014032=}013032&,1000000000000XYZ123'];
    
const qstrings = initialStrings.map((str) => encodeURIComponent(str));

export default qstrings;
