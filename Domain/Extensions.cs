using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Domain
{
    public static class Extensions
    {
        public static string GetDescription(this Enum input) {
            Type inputEnumType = input.GetType();
            MemberInfo[] memberInfo = inputEnumType.GetMember(input.ToString());
            
            if ((memberInfo != null && memberInfo.Length > 0)) {
                
                var _Attribs = memberInfo[0].GetCustomAttribute(typeof(System.ComponentModel.DescriptionAttribute), false);

                if ((_Attribs != null)) {
                    return ((System.ComponentModel.DescriptionAttribute)_Attribs).Description;
                }
            }
            
            return input.ToString();
        }
    }
}