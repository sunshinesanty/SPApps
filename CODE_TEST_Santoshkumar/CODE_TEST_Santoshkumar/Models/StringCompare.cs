using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CODE_TEST_Santoshkumar.Models
{
    public static class StringCompare
    {
        public static List<int> Compare(string Source, string Pattern)
        {
            List<char> sourceChars = Source.ToList();
            List<char> patternChars = Pattern.ToList();
            List<int> positionsStarting = new List<int>();
            int ptIndx = 0;
            for (int i = 0; i < sourceChars.Count; i++)
            {
                int comIdx = i + ptIndx;
                while (ptIndx < patternChars.Count && comIdx < sourceChars.Count && sourceChars[comIdx] == patternChars[ptIndx])
                {
                    ptIndx++;
                    comIdx = i + ptIndx;
                }
                if (ptIndx == patternChars.Count)
                    positionsStarting.Add(i);
                ptIndx = 0; //reset back for next Iteration
            }
            return positionsStarting;
        }
    }
}