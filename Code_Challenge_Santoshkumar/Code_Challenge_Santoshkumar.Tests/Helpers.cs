using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Code_Challenge_Santoshkumar.Models;

namespace Code_Challenge_Santoshkumar.Tests
{
    public class Helpers
    {
        public static void HasEqualFieldValues<T>(T Expected, T Actual)
        {
            var Failures = new List<string>();
            var Fields = typeof(T).GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
            foreach (var field in Fields)
            {
                var v1 = field.GetValue(Expected);
                var v2 = field.GetValue(Actual);
                if (v1 == null && v2 == null) continue;
                if (!v1.Equals(v2)) Failures.Add(string.Format("{0}: Expected:<{1}> Actual:<{2}>", field.Name, v1, v2));
            }
            if (Failures.Any())
                Assert.Fail("HasEqualFieldValues failed. " + string.Join(Environment.NewLine, Failures));
        }
    }
}
