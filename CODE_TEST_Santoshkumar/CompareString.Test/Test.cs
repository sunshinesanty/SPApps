using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using CODE_TEST_Santoshkumar.Models;

namespace CompareString.Test
{
    public class Test
    {
        /// <summary>
        /// Tests to chcek if the data output is correct
        /// </summary>
        [Test]
        public void Test_DetermineTriangleType()
        {
            Assert.AreEqual(new int[] { 6, 24 }, StringCompare.Compare("hello test user this is test", "test"), "Test Failed");
            Assert.AreEqual(new List<int>().ToArray(), StringCompare.Compare("hello test user this is test", "test1"), "Test Failed");
        }
    }
}
